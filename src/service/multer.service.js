const multer = require("multer");
const path = require('path');
const { responseMsg } = require("../response");

const fileFilter = (req, file, cb) => {
    try {
        // console.log(file, ":file.fieldname")
        // console.log(req.body, ":req.body")

        let allowedFileType = [];
        switch (file.fieldname) {
            case 'image':
            case 'imageUrl':
                allowedFileType = [
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".jfif",
                    ".avif",
                    ".gif",
                    ".pjpeg",
                    ".pjp",
                    ".svg",
                    ".webp",
                    ".pdf",
                ]
                break;
            case 'csv_file':
            case 'excel_file':
                allowedFileType = [
                    ".csv",
                    ".xlsx"
                ]
                break;
            // case 'excel_file':
            //     allowedFileType = [
            //         ".xlsx",
            //     ]
            //     break;
            default:
                allowedFileType = [];
                break;
        }

        const extname = path.extname(file.originalname).toLowerCase();
        // console.log('File_Size:---',)

        if (allowedFileType.includes(extname)) {
            console.log('File is valid')
            return cb(null, true)
        } else {
            return cb(new Error(responseMsg.validationError(0, 'Invalid file type')))
        }
    } catch (error) {
        console.log('Wrong file')
        return cb(new Error(responseMsg.validationError(0, 'Something went wrong', error.message)))
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        switch (file.fieldname) {
            case 'image':
                cb(null, path.join(__dirname, '../../public/uploads/multer'))
                break;
            case 'imageUrl':
                cb(null, path.join(__dirname, '../../public/uploads/multer/productImgs'))
                break;
            case 'csv_file':
                cb(null, path.join(__dirname, '../../public/uploads/csv'))
                break;
            case 'excel_file':
                cb(null, path.join(__dirname, '../../public/uploads/upload_excel'))
                break;
            default:
                cb(null, path.join(__dirname, '../../public/uploads/common'))
                break;
        }
    },

    filename: function (req, file, cb) {
        const getFileName = () => {
            return (
                Date.now() +
                "-" +
                path.basename(file.originalname, path.extname(file.originalname))
                    .replace(/ /g, "_") +
                path.extname(file.originalname).toLowerCase()
            )
        }

        switch (file.fieldname) {
            case 'image':
            case 'csv_file':
            case 'excel_file':
            case 'imageUrl':
                cb(null, getFileName())
                break;
            default:
                cb(null, getFileName())
                break;
        }
    },
})

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

module.exports = upload;