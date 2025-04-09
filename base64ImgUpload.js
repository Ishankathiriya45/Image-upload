const fs = require('fs');
const path = require('path');

const imageUpload = async (req, res) => {
    try {
        const { base64Image, fileName } = req.body;

        if (!base64Image || !fileName) {
            return res.status(400).json({ message: 'Missing base64Image or fileName' });
        }

        // Extract the file type (e.g., png, jpg)
        const match = base64Image.match(/^data:image\/([a-zA-Z]+);base64,/);
        if (!match) {
            return res.status(400).json({ message: 'Invalid base64 image format' });
        }
        const fileType = match[1];
        const base64Data = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

        // Define file path
        const filePath = path.join(__dirname, 'uploads/base64', `${fileName}.${fileType}`);
        const resPath = (`${Date.now()}-${fileName}.${fileType}`);
        
        // Ensure the uploads directory exists
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        // Write the file
        fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

        res.status(200).json({ message: 'File uploaded successfully', resPath, filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    imageUpload
}