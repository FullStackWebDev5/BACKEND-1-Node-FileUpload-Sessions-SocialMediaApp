const userModel = require('../models/user')

const displayProfilePage = (req, res) => {
  res.render('profile')
}

const displaySignupPage = (req, res) => {
  res.render('signup')
}

const displayLoginPage = (req, res) => {
  res.render('login', { errMsg: '' })
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
  res.render('profile', newUser)
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  const user = userModel.checkUserExists(email, password)

  if(!user) {
    res.render('login', { errMsg: 'Invalid credentials' })
  }
  res.render('profile', user)
}

module.exports = {
  displayProfilePage,
  displaySignupPage,
  displayLoginPage,
  fetchUsers,
  signupUser,
  loginUser
}