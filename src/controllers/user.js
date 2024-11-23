const userModel = require('../models/user')

const displayProfilePage = (req, res) => {
  res.render('profile')
}

const displaySignupPage = (req, res) => {
  res.render('signup')
}

const displayLoginPage = (req, res) => {
  res.render('login')
}

const fetchUsers = (req, res) => {
  const users = userModel.getAll()
  res.json(users)
}

const signupUser = (req, res) => {
  const { name, email, password, age, imageURL } = req.body
  const newUser = { name, email, password, age, imageURL }
  userModel.add(newUser)
  res.redirect('/profile')
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  const user = userModel.checkUserExists(email, password)
  res.redirect('/profile')
}

module.exports = {
  displayProfilePage,
  displaySignupPage,
  displayLoginPage,
  fetchUsers,
  signupUser,
  loginUser
}