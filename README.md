🎥 YouTube Video Extractor Chrome Extension
A powerful Chrome extension that extracts comprehensive video information from YouTube pages and exports it as CSV files. Perfect for content creators, researchers, marketers, and anyone who needs to analyze YouTube content at scale.

✨ Features
🎯 Multi-page Support: Works on channel pages, playlists, search results, and more
📊 Comprehensive Data: Extract titles, URLs, video IDs, channels, publish dates, durations, view counts
🖼️ Optional Metadata: Include thumbnails, descriptions when available
📱 Smart Scrolling: Automatically loads more videos on infinite scroll pages
💾 CSV Export: Clean, properly formatted CSV files ready for analysis
🔍 Real-time Preview: See extracted videos before exporting
🚀 Fast & Local: All processing happens in your browser - no external servers

🚀 Quick Start
Installation

Download the extension files

   git clone https://github.com/yourusername/youtube-video-extractor
   # OR download and create these files manually

Create the extension folder structure

   youtube-video-extractor/
   ├── manifest.json
   ├── popup.html
   ├── popup.js
   ├── content.js
   └── README.md

Load into Chrome

Open Chrome and navigate to chrome://extensions/
Enable "Developer mode" (toggle in top right)
Click "Load unpacked"
Select your youtube-video-extractor folder
The extension icon will appear in your toolbar



Usage

Navigate to any YouTube page:

Channel: https://www.youtube.com/@channelname
Playlist: https://www.youtube.com/playlist?list=...
Search results: https://www.youtube.com/results?search_query=...


Click the extension icon in your Chrome toolbar
Configure options (optional):

✅ Include thumbnail URLs
✅ Include descriptions
✅ Include view counts


Extract videos: Click "📊 Extract All Videos"
Export data: Click "📄 Export as CSV"

📁 File Structure
youtube-video-extractor/
├── manifest.json          # Extension configuration
├── popup.html             # User interface
├── popup.js               # UI logic and CSV generation
├── content.js             # YouTube page analysis
├── icons/                 # Extension icons (optional)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
📊 CSV Output Format
The exported CSV includes these columns:
ColumnDescriptionExampleTitleVideo title"How to Build a Rocket"URLFull YouTube video URL"https://www.youtube.com/watch?v=abc123"Video IDYouTube video identifier"abc123"ChannelChannel name"SpaceX"Published TimeWhen video was published"2 days ago"DurationVideo length"10:23"View CountNumber of views"1.2M views"Thumbnail URLVideo thumbnail (optional)"https://i.ytimg.com/vi/abc123/maxresdefault.jpg"DescriptionVideo description (optional)"In this video we..."
🎯 Supported Pages
Page TypeURL PatternSupportChannel Pages/@username or /channel/ID✅ FullPlaylist Pages/playlist?list=✅ FullSearch Results/results?search_query=✅ FullHome/Trending/ or /trending✅ FullVideo Pages/watch?v=✅ Related videos
🛠️ Technical Details
Permissions Required

activeTab: Access current YouTube page
storage: Save user preferences
host_permissions: YouTube.com access only

Browser Compatibility

✅ Chrome 88+
✅ Chromium-based browsers (Edge, Brave, etc.)
❌ Firefox (different extension format)

Privacy & Security

🔒 No data collection: Everything runs locally
🔒 No external servers: No data sent anywhere
🔒 YouTube only: Limited to youtube.com domain
🔒 Open source: Full code transparency

🔧 Development
Prerequisites

Chrome browser with Developer mode enabled
Basic knowledge of HTML, CSS, JavaScript

Local Development

Clone the repository
Make changes to the files
Go to chrome://extensions/
Click refresh button on the extension
Test on YouTube pages

Building for Production
The extension is production-ready as-is. For distribution:

Zip the extension folder
Upload to Chrome Web Store (requires developer account)

🐛 Troubleshooting
Common Issues
"Error analyzing page"

Refresh the YouTube page completely
Wait for page to fully load before clicking extension
Check that extension has proper permissions

"No videos found"

Ensure you're on a page with video listings
Try scrolling down to load more content
Some restricted content may not be accessible

Extension doesn't appear

Verify Developer mode is enabled
Check all files are in correct folder
Reload extension in chrome://extensions/

CSV export fails

Check browser allows downloads
Disable popup blockers temporarily
Verify you have write permissions to Downloads folder

Debug Mode

Open Developer Tools (F12)
Go to Console tab
Click extension icon
Look for error messages or logs

🤝 Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.
Development Setup

Fork the repository
Create a feature branch
Make your changes
Test thoroughly on different YouTube pages
Submit a pull request

Code Style

Use modern JavaScript (ES6+)
Comment complex logic
Follow existing code formatting
Test on multiple page types

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

YouTube for providing the platform
Chrome Extensions documentation
Open source community for inspiration

📞 Support

Issues: GitHub Issues
Documentation: This README
Community: Discussions

🔄 Version History
v1.0.0 (Current)

Initial release
Multi-page support (channels, playlists, search)
CSV export functionality
Smart scrolling for infinite pages
Comprehensive data extraction


⭐ If this extension helps you, please consider starring the repository!
📈 Roadmap

 Batch processing multiple channels
 Custom export formats (JSON, Excel)
 Video thumbnail downloads
 Filtering and search within results
 Scheduled extractions
 API integration options


Made with ❤️ for the YouTube community
