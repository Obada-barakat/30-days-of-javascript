const express  = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

//Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all to serve index.html for unkown routes (SPA-style)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
