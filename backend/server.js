require('dotenv').config()
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('./aws-config')

const app = express()
const port = 3000

const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  })
})

app.post('/upload', upload.single('image'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }
  res.send({ imageUrl: req.file.location })
})

app.get('/', (req, res) => {
  res.send('Hello Worldd!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})