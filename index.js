const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const upload = require('./src/middlewares/multer')
const userControllers = require('./src/controllers/user')

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

app.get('/', (req, res) => {
  res.json({
    message: 'Server is up'
  })
})

app.get('/profile', userControllers.displayProfilePage)
app.get('/signup', userControllers.displaySignupPage)
app.get('/login', userControllers.displayLoginPage)

app.get('/api/users', userControllers.fetchUsers)
app.post('/api/signup', upload.single('profileimagefile'), userControllers.signupUser)
app.post('/api/login', userControllers.loginUser)

app.listen(3000, () => {
  console.log('Server is up :)')
})
















/*
  # File Upload
    - Multer: Node.js middleware for handling multipart/form-data (uploading files)
      - storage = multer.diskStorage(): destination, filename
      - Pass storage as an object field to multer(), get a reference to 'upload' object
      - 'upload' middlewares:
        - single(): Handle single file uploads
        - array(): Handle multiple file uploads

      - Code
        - Middleware config
          const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads/')
            },
            filename: function (req, file, cb) {
              cb(null, `profile-img-${counter++}${path.extname(file.originalname)}`)
            }
          })
          const upload = multer({ storage })

        - Single file upload
          <form class="custom-form" method="POST" action="/submit-upload" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="exampleInputEmail2" class="form-label">Upload Image</label>
              <input type="file" class="form-control" id="exampleInputEmail2" name="profileImage">
            </div>
            <button type="submit" class="btn btn-dark">Submit</button>
          </form>

          app.post('/submit-upload', upload.single('profileImage'), (req, res) => {
            res.send('File uploaded successfully!')
          })

        - Multiple files upload
          <form class="custom-form" method="POST" action="/submit-upload" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="exampleInputEmail2" class="form-label">Upload Images</label>
              <input type="file" class="form-control" id="exampleInputEmail2" name="profileImages" multiple>
            </div>
            <button type="submit" class="btn btn-dark">Submit</button>
          </form>

          app.post('/submit-upload', upload.array('profileImages', 2), (req, res) => {
            res.send('Files uploaded successfully!')
          })

  # Resources:
    - multipart/form-data: https://varaprasadh.medium.com/what-the-heck-is-multipart-form-data-8df091d598b5
    - multer: https://www.npmjs.com/package/multer



*/