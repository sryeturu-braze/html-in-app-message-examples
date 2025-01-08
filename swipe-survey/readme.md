# Card Swipe Survey

This interactive in-app message allows users to swipe through cards to select their likes and dislikes. These choices are saved to the user's profile and can be used in subsequent messaging.

![Gif of card swiping survey](sruvey.gif)

## Getting Started

To use this template in your Braze in-app messaging, follow these steps:

1. **Create an In-App Message**: 
   - Start a new in-app message campaign and select the **"Custom Code"** message type.

2. **Copy and Paste HTML Code**: 
   - Insert the code from `index.html` into the code editor.

3. **Edit Placeholder Items**: 
   - To replace the placeholder items, edit the `cardsData` variable at the top of the `script.js` file:

    ```javascript
    const cardsData = [
        {
            img: 'https://picsum.photos/id/12/300', // URL of the image for the card
            title: 'Item #1 Title', // Title displayed underneath the image
            name: 'item_1', // Name of the item for tracking in the liked_items or disliked_items arrays on the user's Braze profile
        },
        // Add more items as needed
    ];
    ```

4. **Upload Assets**: 
   - Upload the modified `script.js` and `styles.css` files.

5. **Test**: 
   - Ensure that the message renders correctly on various devices. After completing the survey, the results will appear as custom attributes under the user profile called `liked_items` and `disliked_items`.

## Dependencies

This template utilizes [Font Awesome](https://fontawesome.com/) for the icons used in the interface.