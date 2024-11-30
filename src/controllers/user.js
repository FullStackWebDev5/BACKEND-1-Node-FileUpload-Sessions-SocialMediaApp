const userModel = require('../models/user')

const displayProfilePage = (req, res) => {
  if(!req.session.user) {
    return res.redirect('/login')
  }
  res.render('profile', req.session.user)
}

const displaySignupPage = (req, res) => {
  res.render('signup')
}

const displayLoginPage = (req, res) => {
  res.render('login', { errMsg: '' })
}

const displayDashboard = (req, res) => {
  if(!req.session.user) {
    return res.redirect('/login')
  }
  res.send('Welcome to Dashboard')
}

const fetchUsers = (req, res) => {
  const users = userModel.getAll()
  res.json(users)
}

const signupUser = (req, res) => {
  const { name, email, password, age } = req.body
  const { file } = req
  const newUser = { name, email, password, age, imageURL: `/uploads/${file.originalname}` }
  userModel.add(newUser)
  req.session.user = newUser
  res.redirect('/profile')
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  const user = userModel.checkUserExists(email, password)

  if(!user) {
    res.render('login', { errMsg: 'Invalid credentials' })
  }

  req.session.user = user
  res.redirect('/profile')
}

module.exports = {
  displayProfilePage,
  displayDashboard,
  displaySignupPage,
  displayLoginPage,
  fetchUsers,
  signupUser,
  loginUser
}