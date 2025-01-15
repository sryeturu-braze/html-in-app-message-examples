# Scratch-Off Reveal

This in-app message features a scratch-off game where users can reveal a hidden image.

![Gif of memory game](scratch.gif)

## Getting Started

To use this template in your Braze in-app messaging, follow these steps:

1. **Create In-App Message**: Start a new in-app message campaign and select the "Custom Code" message type.

3. **Customize**: Create and/or modify the in-app message to match your brand's use case and style:
   - **Card Images**: Replace `front.png` and `reveal.png` with your own images to customize the scratch-off surface and the hidden content. Use images with a 9:16 aspect ratio (preferably 800px by 1422px) to optimize for mobile screens. If using different image names, change lines 12 and 13 in `index.html`

   - **Custom Font** (optional): To use a custom font for the "Close" button text:
     1. Open `index.html` and delete lines 16 and 31 to uncomment the code snippet.
     2. Update the `fontUrl` variable on line 20 with the URL of your font file (e.g., `url(https://my-custom-font.woff)`).

   - **Custom Styling** (optional):
     1. modify `styles.css` to change any colors and styling

2. **Upload Files**: Copy and Paste `index.html` into the code editor and upload the `styles.css`, `script.js` and any other files used in the drag and drop media library.


4. **Test**: Verify that the message renders correctly on various devices for optimal performance.
