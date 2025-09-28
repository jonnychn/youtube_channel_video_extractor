let extractedVideos = [];
let currentPageInfo = null;

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await initializePopup();
    setupEventListeners();
});

async function initializePopup() {
    try {
        // Get current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab.url.includes('youtube.com')) {
            showStatus('not-youtube', '⚠️ Please navigate to a YouTube page first');
            return;
        }

        // Try to inject content script (it might already be injected)
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
        } catch (injectionError) {
            // Content script might already be injected, that's okay
            console.log('Content script injection note:', injectionError);
        }

        // Wait a moment for content script to initialize
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get page information
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getPageInfo' });
        
        if (response && response.success) {
            currentPageInfo = response.data;
            updateUI(response.data);
        } else {
            // Try one more time after a longer delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            const retryResponse = await chrome.tabs.sendMessage(tab.id, { action: 'getPageInfo' });
            
            if (retryResponse && retryResponse.success) {
                currentPageInfo = retryResponse.data;
                updateUI(retryResponse.data);
            } else {
                showStatus('error', '❌ Could not analyze this page. Try refreshing and reopening the extension.');
            }
        }
    } catch (error) {
        console.error('Initialization error:', error);
        showStatus('error', '❌ Error analyzing page. Try refreshing the YouTube page.');
    }
}

function updateUI(pageInfo) {
    const { pageType, videoCount, videos } = pageInfo;
    
    if (videoCount === 0) {
        showStatus('error', '📭 No videos found on this page');
        return;
    }

    showStatus('found', `✅ Found ${videoCount} videos on this ${pageType} page`);
    
    // Update counts
    document.getElementById('videoCount').textContent = videoCount;
    document.getElementById('pageType').textContent = pageType;
    
    // Show preview of videos
    updateVideoPreview(videos.slice(0, 5)); // Show first 5 videos
    
    // Show results section
    document.getElementById('results').style.display = 'block';
    document.getElementById('controls').style.display = 'block';
}

function updateVideoPreview(videos) {
    const preview = document.getElementById('videoPreview');
    preview.innerHTML = '';
    
    videos.forEach(video => {
        const item = document.createElement('div');
        item.className = 'video-item';
        item.innerHTML = `
            <div class="video-title">${video.title}</div>
            <div class="video-meta">${video.publishedTime || 'Unknown date'} • ${video.duration || 'Unknown duration'}</div>
        `;
        preview.appendChild(item);
    });
    
    if (currentPageInfo.videoCount > 5) {
        const more = document.createElement('div');
        more.className = 'video-item';
        more.style.fontStyle = 'italic';
        more.style.textAlign = 'center';
        more.innerHTML = `<div class="video-title">...and ${currentPageInfo.videoCount - 5} more videos</div>`;
        preview.appendChild(more);
    }
}

function setupEventListeners() {
    document.getElementById('extractBtn').addEventListener('click', extractAllVideos);
    document.getElementById('exportBtn').addEventListener('click', exportToCsv);
    document.getElementById('refreshBtn').addEventListener('click', initializePopup);
}

async function extractAllVideos() {
    const extractBtn = document.getElementById('extractBtn');
    const exportBtn = document.getElementById('exportBtn');
    const loading = document.getElementById('loading');
    
    extractBtn.disabled = true;
    loading.style.display = 'block';
    
    try {
        // Get current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Request full video extraction
        const response = await chrome.tabs.sendMessage(tab.id, { 
            action: 'extractAllVideos',
            options: {
                includeThumbnails: document.getElementById('includeThumbnails').checked,
                includeDescriptions: document.getElementById('includeDescriptions').checked,
                includeViewCounts: document.getElementById('includeViewCounts').checked
            }
        });
        
        if (response && response.success) {
            extractedVideos = response.data;
            exportBtn.disabled = false;
            showStatus('found', `✅ Extracted ${extractedVideos.length} videos successfully`);
        } else {
            showStatus('error', '❌ Failed to extract videos');
        }
    } catch (error) {
        console.error('Extraction error:', error);
        showStatus('error', '❌ Error during extraction');
    } finally {
        extractBtn.disabled = false;
        loading.style.display = 'none';
    }
}

function exportToCsv() {
    if (extractedVideos.length === 0) {
        showStatus('error', '❌ No videos to export');
        return;
    }
    
    // Create CSV content
    const headers = [
        'Title',
        'URL',
        'Video ID',
        'Channel',
        'Published Time',
        'Duration',
        'View Count'
    ];
    
    // Add optional headers based on user selection
    if (document.getElementById('includeThumbnails').checked) {
        headers.push('Thumbnail URL');
    }
    if (document.getElementById('includeDescriptions').checked) {
        headers.push('Description');
    }
    
    const csvContent = [
        headers.join(','),
        ...extractedVideos.map(video => {
            const row = [
                escapeCsvField(video.title),
                video.url,
                video.videoId,
                escapeCsvField(video.channel || ''),
                video.publishedTime || '',
                video.duration || '',
                video.viewCount || ''
            ];
            
            if (document.getElementById('includeThumbnails').checked) {
                row.push(video.thumbnail || '');
            }
            if (document.getElementById('includeDescriptions').checked) {
                row.push(escapeCsvField(video.description || ''));
            }
            
            return row.join(',');
        })
    ].join('\n');
    
    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `youtube_videos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showStatus('found', '✅ CSV file downloaded successfully');
}

function escapeCsvField(field) {
    if (field === null || field === undefined) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function showStatus(type, message) {
    const status = document.getElementById('status');
    status.className = `status ${type}`;
    status.textContent = message;
}