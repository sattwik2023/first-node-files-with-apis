const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 5200; // Uppercase 'PORT'
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'upload'); // Corrected 'cd' to 'cb' and 'upload/' to 'upload'
        },
        filename: (req, file, cb) => {
            // cb(null, file.originalname); // Corrected 'rer' to 'req' and 'cd' to 'cb'
            const ext = path.extname(file.originalname); // Get the file extension
            const name = path.basename(file.originalname, ext);

            cb(null, name + '-' + Date.now() + ext); // Corrected 'rer' to 'req' and 'cd' to 'cb'

        }
    })
}).single("user-upload");

app.post('/upload', upload, (req, resp) => {
    resp.send('File uploaded successfully');
});

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.error('Server failed to start:', err);
    }
});
