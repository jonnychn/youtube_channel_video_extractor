// Content script that runs on YouTube pages
class YouTubeVideoExtractor {
    constructor() {
        this.videos = [];
        this.pageType = 'unknown';
    }

    // Main method to analyze current page
    analyzeCurrentPage() {
        const url = window.location.href;
        
        if (url.includes('/channel/') || url.includes('/@')) {
            this.pageType = 'channel';
        } else if (url.includes('/playlist')) {
            this.pageType = 'playlist';
        } else if (url.includes('/results')) {
            this.pageType = 'search';
        } else if (url.includes('/watch')) {
            this.pageType = 'video';
        } else {
            this.pageType = 'home';
        }

        this.extractVideosFromPage();
        
        return {
            pageType: this.pageType,
            videoCount: this.videos.length,
            videos: this.videos
        };
    }

    // Extract videos based on page type
    extractVideosFromPage() {
        this.videos = [];
        
        // Different selectors for different page types
        const selectors = [
            // Channel videos, playlist items
            'ytd-grid-video-renderer',
            'ytd-playlist-video-renderer',
            // Search results
            'ytd-video-renderer',
            // Compact video renderers
            'ytd-compact-video-renderer',
            // Rich grid renderers
            'ytd-rich-grid-media',
            // Shelf renderers
            'ytd-video-shelf-renderer ytd-compact-video-renderer'
        ];

        let videoElements = [];
        
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                videoElements = Array.from(elements);
                break;
            }
        }

        // Extract data from each video element
        videoElements.forEach((element, index) => {
            const videoData = this.extractVideoData(element, index);
            if (videoData && videoData.title && videoData.videoId) {
                this.videos.push(videoData);
            }
        });

        // Remove duplicates based on video ID
        this.videos = this.videos.filter((video, index, self) => 
            index === self.findIndex(v => v.videoId === video.videoId)
        );
    }

    // Extract data from individual video element
    extractVideoData(element, index) {
        try {
            const videoData = {
                index: index + 1,
                title: '',
                url: '',
                videoId: '',
                channel: '',
                publishedTime: '',
                duration: '',
                viewCount: '',
                thumbnail: '',
                description: ''
            };

            // Extract title
            const titleElement = element.querySelector('#video-title, .ytd-video-renderer #video-title, h3 a, .ytd-compact-video-renderer #video-title');
            if (titleElement) {
                videoData.title = titleElement.textContent?.trim() || titleElement.getAttribute('title') || '';
            }

            // Extract URL and video ID
            const linkElement = element.querySelector('a#video-title-link, a#thumbnail, #video-title, h3 a') || 
                               element.querySelector('a[href*="/watch"]');
            
            if (linkElement) {
                const href = linkElement.getAttribute('href');
                if (href) {
                    if (href.startsWith('/watch')) {
                        videoData.url = `https://www.youtube.com${href}`;
                    } else if (href.startsWith('https://www.youtube.com/watch')) {
                        videoData.url = href;
                    }
                    
                    // Extract video ID from URL
                    const urlParams = new URLSearchParams(href.split('?')[1]);
                    videoData.videoId = urlParams.get('v') || '';
                }
            }

            // Extract channel name
            const channelElement = element.querySelector('.ytd-channel-name a, #channel-name a, .ytd-video-owner-renderer a');
            if (channelElement) {
                videoData.channel = channelElement.textContent?.trim() || '';
            }

            // Extract published time
            const timeElement = element.querySelector('#metadata-line span:last-child, .ytd-video-meta-block span:last-child, #published-time-text');
            if (timeElement) {
                videoData.publishedTime = timeElement.textContent?.trim() || '';
            }

            // Extract duration
            const durationElement = element.querySelector('.ytd-thumbnail-overlay-time-status-renderer, #overlays .ytd-thumbnail-overlay-time-status-renderer');
            if (durationElement) {
                videoData.duration = durationElement.textContent?.trim() || '';
            }

            // Extract view count
            const viewElement = element.querySelector('#metadata-line span:first-child, .ytd-video-meta-block span:first-child, #view-count-text');
            if (viewElement) {
                videoData.viewCount = viewElement.textContent?.trim() || '';
            }

            // Extract thumbnail
            const thumbnailElement = element.querySelector('img');
            if (thumbnailElement) {
                videoData.thumbnail = thumbnailElement.src || thumbnailElement.getAttribute('data-src') || '';
            }

            // Extract description (if available)
            const descElement = element.querySelector('#description-text, .description-text');
            if (descElement) {
                videoData.description = descElement.textContent?.trim() || '';
            }

            return videoData;

        } catch (error) {
            console.error('Error extracting video data:', error);
            return null;
        }
    }

    // Scroll page to load more videos (for infinite scroll pages)
    async scrollToLoadMore() {
        const initialCount = this.videos.length;
        let scrollAttempts = 0;
        const maxScrolls = 10;

        while (scrollAttempts < maxScrolls) {
            window.scrollTo(0, document.body.scrollHeight);
            
            // Wait for content to load
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Re-extract videos
            this.extractVideosFromPage();
            
            // If no new videos loaded, stop scrolling
            if (this.videos.length === initialCount) {
                break;
            }
            
            scrollAttempts++;
        }
    }

    // Get comprehensive video data with optional scrolling
    async getComprehensiveVideoData(options = {}) {
        const shouldScroll = options.scrollToLoadMore !== false;
        
        if (shouldScroll && (this.pageType === 'channel' || this.pageType === 'playlist')) {
            await this.scrollToLoadMore();
        }

        return this.videos;
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
        if (request.action === 'getPageInfo') {
            // Add a small delay to ensure page is ready
            setTimeout(() => {
                try {
                    const pageInfo = extractor.analyzeCurrentPage();
                    sendResponse({ success: true, data: pageInfo });
                } catch (error) {
                    console.error('Error in getPageInfo:', error);
                    sendResponse({ success: false, error: error.message });
                }
            }, 100);
            return true; // Keep message channel open
        } 
        else if (request.action === 'extractAllVideos') {
            extractor.getComprehensiveVideoData(request.options)
                .then(videos => {
                    sendResponse({ success: true, data: videos });
                })
                .catch(error => {
                    console.error('Error extracting videos:', error);
                    sendResponse({ success: false, error: error.message });
                });
            return true; // Keep message channel open for async response
        }
    } catch (error) {
        console.error('Content script error:', error);
        sendResponse({ success: false, error: error.message });
    }
});

// Initialize extractor when script loads
const extractor = new YouTubeVideoExtractor();

// Auto-analyze page when script loads with error handling
setTimeout(() => {
    try {
        extractor.analyzeCurrentPage();
        console.log('YouTube Video Extractor: Content script loaded successfully');
    } catch (error) {
        console.error('YouTube Video Extractor: Error during initialization:', error);
    }
}, 1000);