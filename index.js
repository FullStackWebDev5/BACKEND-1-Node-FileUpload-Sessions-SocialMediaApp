const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const upload = require('./src/middlewares/multer')
const { isLoggedIn } = require('./src/middlewares/user')
const userControllers = require('./src/controllers/user')
const interestController = require('./src/controllers/interest')

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

app.get('/', (req, res) => {
  res.json({
    message: 'Server is up'
  })
})

app.get('/profile', isLoggedIn, userControllers.displayProfilePage)
app.get('/dashboard', isLoggedIn, userControllers.displayDashboard)
app.get('/signup', userControllers.displaySignupPage)
app.get('/login', userControllers.displayLoginPage)

app.get('/api/users', isLoggedIn, userControllers.fetchUsers)
app.post('/api/signup', upload.single('profileimagefile'), userControllers.signupUser)
app.post('/api/login', userControllers.loginUser)
app.get('/api/logout', userControllers.logoutUser)

app.get('/interests', isLoggedIn, interestController.displayInterestPage)
app.get('/api/interests', isLoggedIn, interestController.fetchInterests)
app.post('/api/interests', isLoggedIn, interestController.createInterest)

app.get('/api/users/:id/interests', interestController.fetchUserInterests)
app.post('/api/users/:id/interests', interestController.createUserInterest)

app.get('/404', (req, res) => {
  res.send(`This page doesn't exist`)
})
app.get('*', (req, res) => {
  res.redirect('/404')
})

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

  # Sessions and Cookies
    - Sessions: 
      - A mechanism in which server uniquely identifies a client
      - A unique session ID is returned to the client the very first time a request is made
      - Illustration: https://miro.medium.com/v2/resize:fit:1400/1*-D6Ids2z9ebtz0_m9qeBBA.png
      - 'express-session' package
        - Configure session middleware
        - This will add 'session' key to req object, can be accessed as req.session
        - Cookie name by default: 'connect.sid'
    - Cookies:
      - Cookies are small pieces of data stored on the client's browser
      - To access a cookie: req.cookies
      - To set custom cookie: res.cookie('key', 'value', { maxAge: '' })
      - 'cookie-parser' package
        - Add cookies to req.cookies

    - Code:
      app.get('/learn-sessions', (req, res) => {
        if(!req.session.counter) {
          req.session.counter = 1
        } else {
          req.session.counter++
        }
        res.send(`<h1>You accessed this webpage ${req.session.counter} times</h1>`)
      })

  # Resources:
    - multipart/form-data: https://varaprasadh.medium.com/what-the-heck-is-multipart-form-data-8df091d598b5
    - multer: https://www.npmjs.com/package/multer
    - express-session: https://www.npmjs.com/package/express-session
    - cookie-parser: https://www.npmjs.com/package/cookie-parser

*/