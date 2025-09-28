# 🎥 YouTube Video Extractor Chrome Extension

A powerful Chrome extension that extracts comprehensive video information from YouTube pages and exports it as CSV files. Perfect for content creators, researchers, marketers, and anyone who needs to analyze YouTube content at scale.

![Extension Demo](https://img.shields.io/badge/Chrome-Extension-blue?logo=googlechrome)
![Version](https://img.shields.io/badge/version-1.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **🎯 Multi-page Support**: Works on channel pages, playlists, search results, and more
- **📊 Comprehensive Data**: Extract titles, URLs, video IDs, channels, publish dates, durations, view counts
- **🖼️ Optional Metadata**: Include thumbnails, descriptions when available
- **📱 Smart Scrolling**: Automatically loads more videos on infinite scroll pages
- **💾 CSV Export**: Clean, properly formatted CSV files ready for analysis
- **🔍 Real-time Preview**: See extracted videos before exporting
- **🚀 Fast & Local**: All processing happens in your browser - no external servers

## 🚀 Quick Start

### Installation

1. **Download the extension files**
   ```bash
   git clone https://github.com/yourusername/youtube-video-extractor
   # OR download and create these files manually
   ```

2. **Create the extension folder structure**
   ```
   youtube-video-extractor/
   ├── manifest.json
   ├── popup.html
   ├── popup.js
   ├── content.js
   └── README.md
   ```

3. **Load into Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" 
   - Select your `youtube-video-extractor` folder
   - The extension icon will appear in your toolbar

### Usage

1. **Navigate to any YouTube page**:
   - Channel: `https://www.youtube.com/@channelname`
   - Playlist: `https://www.youtube.com/playlist?list=...`
   - Search results: `https://www.youtube.com/results?search_query=...`

2. **Click the extension icon** in your Chrome toolbar

3. **Configure options** (optional):
   - ✅ Include thumbnail URLs
   - ✅ Include descriptions  
   - ✅ Include view counts

4. **Extract videos**: Click "📊 Extract All Videos"

5. **Export data**: Click "📄 Export as CSV"

## 📁 File Structure

```
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
```

## 📊 CSV Output Format

The exported CSV includes these columns:

| Column | Description | Example |
|--------|-------------|---------|
| Title | Video title | "How to Build a Rocket" |
| URL | Full YouTube video URL | "https://www.youtube.com/watch?v=abc123" |
| Video ID | YouTube video identifier | "abc123" |
| Channel | Channel name | "SpaceX" |
| Published Time | When video was published | "2 days ago" |
| Duration | Video length | "10:23" |
| View Count | Number of views | "1.2M views" |
| Thumbnail URL | Video thumbnail (optional) | "https://i.ytimg.com/vi/abc123/maxresdefault.jpg" |
| Description | Video description (optional) | "In this video we..." |

## 🎯 Supported Pages

| Page Type | URL Pattern | Support |
|-----------|-------------|---------|
| Channel Pages | `/@username` or `/channel/ID` | ✅ Full |
| Playlist Pages | `/playlist?list=` | ✅ Full |
| Search Results | `/results?search_query=` | ✅ Full |
| Home/Trending | `/` or `/trending` | ✅ Full |
| Video Pages | `/watch?v=` | ✅ Related videos |

## 🛠️ Technical Details

### Permissions Required
- `activeTab`: Access current YouTube page
- `storage`: Save user preferences  
- `host_permissions`: YouTube.com access only

### Browser Compatibility
- ✅ Chrome 88+
- ✅ Chromium-based browsers (Edge, Brave, etc.)
- ❌ Firefox (different extension format)

### Privacy & Security
- 🔒 **No data collection**: Everything runs locally
- 🔒 **No external servers**: No data sent anywhere
- 🔒 **YouTube only**: Limited to youtube.com domain
- 🔒 **Open source**: Full code transparency

## 🔧 Development

### Prerequisites
- Chrome browser with Developer mode enabled
- Basic knowledge of HTML, CSS, JavaScript

### Local Development
1. Clone the repository
2. Make changes to the files
3. Go to `chrome://extensions/`
4. Click refresh button on the extension
5. Test on YouTube pages

### Building for Production
The extension is production-ready as-is. For distribution:
1. Zip the extension folder
2. Upload to Chrome Web Store (requires developer account)

## 🐛 Troubleshooting

### Common Issues

**"Error analyzing page"**
- Refresh the YouTube page completely
- Wait for page to fully load before clicking extension
- Check that extension has proper permissions

**"No videos found"**
- Ensure you're on a page with video listings
- Try scrolling down to load more content
- Some restricted content may not be accessible

**Extension doesn't appear**
- Verify Developer mode is enabled
- Check all files are in correct folder
- Reload extension in chrome://extensions/

**CSV export fails**
- Check browser allows downloads
- Disable popup blockers temporarily
- Verify you have write permissions to Downloads folder

### Debug Mode
1. Open Developer Tools (`F12`)
2. Go to Console tab
3. Click extension icon
4. Look for error messages or logs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on different YouTube pages
5. Submit a pull request

### Code Style
- Use modern JavaScript (ES6+)
- Comment complex logic
- Follow existing code formatting
- Test on multiple page types

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YouTube for providing the platform
- Chrome Extensions documentation
- Open source community for inspiration

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/youtube-video-extractor/issues)
- **Documentation**: This README
- **Community**: [Discussions](https://github.com/yourusername/youtube-video-extractor/discussions)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Multi-page support (channels, playlists, search)
- CSV export functionality
- Smart scrolling for infinite pages
- Comprehensive data extraction

---

**⭐ If this extension helps you, please consider starring the repository!**

## 📈 Roadmap

- [ ] Batch processing multiple channels
- [ ] Custom export formats (JSON, Excel)
- [ ] Video thumbnail downloads
- [ ] Filtering and search within results
- [ ] Scheduled extractions
- [ ] API integration options

---

Made with ❤️ for the YouTube community
