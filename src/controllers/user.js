const userModel = require('../models/user')

const displayProfilePage = (req, res) => {
  const interests = userModel.getInterests(req.session.user.id)
  res.render('profile', { ...req.session.user, interests } )
}

const displaySignupPage = (req, res) => {
  res.render('signup')
}

const displayLoginPage = (req, res) => {
  res.render('login', { errMsg: '' })
}

const displayDashboard = (req, res) => {
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
  const user = userModel.add(newUser)

  let lastLoggedInAt = null
  if(req.cookies.lastLoggedInAt) {
    lastLoggedInAt = req.cookies.lastLoggedInAt
  } else {
    lastLoggedInAt = new Date().toLocaleString()
  }
  req.session.user = { ...user, lastLoggedInAt }
  let currentTime = new Date().toLocaleString()
  res.cookie('lastLoggedInAt', currentTime, { maxAge: 3 * 24 * 60 * 60 * 1000 })
  res.redirect('/profile')
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  const user = userModel.checkUserExists(email, password)

  if(!user) {
    return res.render('login', { errMsg: 'Invalid credentials' })
  }

  let lastLoggedInAt = null
  if(req.cookies.lastLoggedInAt) {
    lastLoggedInAt = req.cookies.lastLoggedInAt
  } else {
    lastLoggedInAt = new Date().toLocaleString()
  }
  req.session.user = { ...user, lastLoggedInAt }
  let currentTime = new Date().toLocaleString()
  res.cookie('lastLoggedInAt', currentTime, { maxAge: 3 * 24 * 60 * 60 * 1000 })
  res.redirect('/profile')
}

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
}

module.exports = {
  displayProfilePage,
  displayDashboard,
  displaySignupPage,
  displayLoginPage,
  fetchUsers,
  signupUser,
  loginUser,
  logoutUser
}