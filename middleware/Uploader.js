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
        const acceptedFile = /pdf|docx/;
        const extensionName = path.extname(file.originalname)

        if (acceptedFile.test(extensionName)) {
            cb(null, true)
        } else {
            cb(new Error('File should be pdf/docx'))
        }
    },
});

module.exports = upload;
