const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

//storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 100}
})

app.use('/profile', express.static('upload/images'))

app.post('/upload', upload.single('profile'), (req, res) => {
        res.json({
            success: true,
            profileUrl: `http://localhost:4000/profile/${req.file.filename}`
        })
})


errHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.json({
            success: false,
            name: err.name,
            message: err.message,
            stack: err.stack
        })
    }
}

app.use(errHandler)

app.listen(4000, ()=>{
    console.log('Server up and running')
    
})