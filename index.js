const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
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
app.post('/api/signup', userControllers.signupUser)
app.post('/api/login', userControllers.loginUser)

app.listen(3000, () => {
  console.log('Server is up :)')
})