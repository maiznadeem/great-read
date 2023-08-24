const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = new Storage({
    keyFilename: path.join(__dirname, 'service-account.json'),
});

async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const bucketName = 'great-read-storage-bucket-maiz';
        const folderName = 'books';
        const uniqueIdentifier = uuidv4();
        const objectName = folderName + '/' + uniqueIdentifier + '-' + req.file.originalname;

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(objectName);

        await file.save(req.file.buffer, {
            contentType: req.file.mimetype,
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${objectName}`;

        console.log('File uploaded to:', publicUrl);
        res.json({
            publicUrl: publicUrl,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
}

module.exports = {
    uploadImage,
};
