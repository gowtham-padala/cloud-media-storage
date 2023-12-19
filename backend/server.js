require('dotenv').config()
const cors = require('cors')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { s3Client } = require('./aws-config')

const app = express()
const port = 3000
app.use(cors())

const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname)
      }
    })
  })
  

app.post('/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }
  res.send({ imageUrl: req.file.location })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})