
# Scratch-Off Reveal Game

This in-app message features a scratch-off game where users can reveal a hidden image.


![Gif of memory game](scratch.gif)


## Getting Started  

To use this template in your Braze in-app messaging, follow these steps:
  

1.  **Create In-App Message**: Create a new in-app message campaign and select the "Custom Code" message type.

2.  **Copy and Paste HTML File**: Insert the code from `index.html` into the code editor.

3.  **Upload Assets**: Upload the assets into the drag and drop media library: `reveal.png`, `front.png`, `script.js`, and `styles.css`.

5.  **Test**: Ensure the in-app message correctly renders across different devices.

## Customization

Customize the in-app message to match a brand or style 
 
-  **Card Images**: Use different images for `front.png` and `reveal.png` images with your own to alter the design of the scratch-off surface and the hidden content. For best results, use images with a 9:16 aspect ratio (preferably 800px by 1422px) to optimize for mobile screens. `front.png` refers to the top most image and `reveal.png` refers to the image that will be revealed.

-  **Custom Font**: To use a custom font for the "Close" button text, follow these additional steps:
    1. Upload a font file to the media library (ex. `my-custom-font.woff`)
    2. Remove lines 16 and 31 in `index.html` which uncomments the script tag which loads the font
    3. Set the correct `fontName` by replacing `'CustomFont` with the name of your font (ex. `MyCustomFont.woff`)
    4. Set the correct `fontUrl` by replacing `'url(custom-font.woff)'` with the url pointing to the uploaded font file (ex. `'url(my-custom-font.woff'`)