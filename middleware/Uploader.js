const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pdf/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fieldSize: '5000000'
    },
    fileFilter: (req, file, cb) => {
        console.log(`file: Uploader.js ~ line 14 ~ file`, file)

        const acceptedFile = /pdf|docx/;
        const extensionName = path.extname(file.originalname)
        console.log(`file: Uploader.js ~ line 19 ~ extensionName`, extensionName)


        if (acceptedFile.test(extensionName)) {
            cb(null, true)
        } else {
            cb(new Error('File should be pdf/docx'))
        }
    },
});

module.exports = upload;
