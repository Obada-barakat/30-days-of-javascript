# Voice Command Web App 🎙️

This is a JavaScript app that uses Web Speech API to:

- Change background or text color with voice
- Show/remove random photos with voice

✅ Built with vanilla JS  
🎯 Deployed on Vercel (static site using `/public`)  
🛠️ `server.js` included for local testing (not used on Vercel)

🧠 Notes on Performance
This project was built to explore the capabilities of the Web Speech Recognition API. While it works as expected, there are a few known limitations:

The program listens continuously and checks on every speech input whether the user wants to:

- Change the background color
- Change the text color
- Show or remove a random photo

That means even if the user is just speaking randomly or giving unrelated input, the app is still calling 3–4 functions repeatedly, which is not ideal for performance.

This was intentional for experimentation, and the current implementation prioritizes simplicity and demonstration over optimization.
⚙️ A better version is planned for the future, with:

- Smarter intent detection
- Reduced function calls per speech event
- Improved overall performance and responsiveness
