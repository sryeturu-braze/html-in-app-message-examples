
# Scratch-Off Reveal Game

This in-app message features a scratch-off game where users can reveal a hidden image.


![Gif of memory game](scratch.gif)


## Getting Started  

To use this template in your Braze in-app messaging, follow these steps:

1.  **Create In-App Message**: Start a new in-app message campaign and select the "Custom Code" message type.

2.  **Copy and Paste HTML File**: Insert the code from `index.html` into the code editor.

3.  **Upload Assets**: Drop the required assets into the media library: `back.png`, `front.png`, `script.js`, and `styles.css`.

4.  **Test**: Verify that the message renders correctly on various devices for optimal performance.

## Customization

Customize the in-app message to match a brand or style 

 
-  **Card Images**: Use different images for `front.png` and `back.png` to alter the design of the scratch-off surface and the hidden content. For best results, use images with a 9:16 aspect ratio (recommended 800px by 1422px) for a mobile-optimized experience. `front.png` refers to the top most image and `back.png` refers to the image that will be revealed.

-  **Custom Font**: To use a custom font for the "Close" button text, follow these additional steps:
    1. Upload your font file to the media library (ex. `my-custom-font.woff`)
    2. In `index.html`, remove the comments from lines 16 and 31 to enable loading of the font.
    3. Set `fontName` to your font name (e.g., `MyCustomFont`).
    4. Update `fontUrl` with the URL of the uploaded font file (e.g., `url(my-custom-font.woff)`).
