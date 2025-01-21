# Customizer - Edit Websites Your Way!

**Customizer** is a browser extension that empowers users to fully customize any website to their liking. From hiding unnecessary elements to changing colors and layout structures, you can save your changes and enjoy the customized experience every time you visit the site—even after refreshing, closing your browser, or restarting your computer!

---

## 🌟 Features

1. **Hide Elements:** Remove unwanted elements like ads, sidebars, or banners with a simple click.
2. **Change Colors and Styles:** Customize text colors, backgrounds, and CSS properties.
3. **Persistent Customizations:** All changes are saved locally and applied automatically every time you visit the same website.
4. **Simple and Intuitive UI:** Hover over elements to see customization options.

---

## 📖 How It Works

1. Install the extension in your browser.
2. Navigate to any webpage you want to customize.
3. Click the **"Activate Customization"** button.
4. Hover over elements to see customization options like:
   - **Hide elements**
   - **Change colors**
   - **Edit CSS**
5. Save your changes, and the extension will remember them for the specific website.

---

## 🎮 User Guide

### Installing the Extension
1. Clone this repository or download the source code.
2. Open your browser and go to the extensions page:
   - **Chrome:** `chrome://extensions/`
   - **Firefox:** `about:addons`
3. Enable **Developer Mode** (for Chrome).
4. Load the unpacked extension by selecting the folder.

### Using the Customization Options
- **Hide Elements:** Hover over elements to see a blue outline, then click to hide them.
- **Edit CSS:** Use the prompt to add custom CSS rules to elements.
- **Change Colors:** Adjust text and background colors with color pickers.
- **Reset Changes:** Use the reset option to undo all customizations.

---

## 👩‍💻 For Developers

### Code Overview
- **Customization Logic:** Uses `MutationObserver` to track and apply changes.
- **Storage:** Stores customizations in `localStorage`, scoped to individual websites.
- **Event Listeners:**
  - `click`: For hiding elements.
  - `keydown`: For shortcuts like exiting customization mode.
  - `mousemove`: For showing hover outlines.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

- Report Bugs: Open an issue in the GitHub repository
- Suggest Features: Share your ideas by opening a feature request
- Contribute Code: Fork the repository and submit a pull request

## Setting Up for Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/customizer-extension.git
```

2. Navigate to the project folder:
```bash
cd customizer-extension
```

3. Install dependencies (if applicable):
```bash
npm install
```

---

### 📬 Support

For questions, feedback, or support, feel free to reach out:

* Email: solankibhautik1702@gmail.com
* GitHub Issues: [Open an issue](https://github.com/SolankiBhautik/Customizer/issues)