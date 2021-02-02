const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'app/static/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
// console.log(storage.getDestination.)
const upload = multer({storage:storage}).single('file')

module.exports = upload