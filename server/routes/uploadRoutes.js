const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		// add timestamp to name using Date.now() to make each filename unique
		// use path's extname method to dynamically get the file's extension (ex. .jpg or .png)
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
	}
})

// only allow file jpg and png filetypes
const checkFileType = (file, cb) => {
	const validFileTypes = /jpg|jpeg|png/
	const extnameIsValid = validFileTypes.test(path.extname(file.originalname).toLowerCase())
	const mimetypeIsValid = validFileTypes.test(file.mimetype)
	// if extname and mimetype are valid, return true
	if (extnameIsValid && mimetypeIsValid) {
		return cb(null, true)
	} else {
		return cb('Images only!')
	}
}

const upload = multer({
	storage, 
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb)
	}
})

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

module.exports = router