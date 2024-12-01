const interestModel = require('../models/interest')
const userModel = require('../models/user')

const displayInterestPage = (req, res) => {
  const interests = interestModel.getAll()
  const currentUser = req.session.user
  res.render('interests', { interests, currentUser })
}

const fetchInterests = (req, res) => {
  const interests = interestModel.getAll()
  res.json(interests)
}

const createInterest = (req, res) => {
  const { name, imageURL } = req.body
  const newInterest = { name, imageURL }
  interestModel.add(newInterest)
  res.redirect('/')
}

const fetchUserInterests = (req, res) => {
  const { id } = req.params
  const interests = userModel.getInterests(Number(id))
  res.json(interests)
}

const createUserInterest = (req, res) => {
  const { id } = req.params
  const { interestId } = req.body
  const interest = interestModel.getInterest(Number(interestId))
  userModel.addInterest(id, interest)
  res.redirect('/profile')
}

module.exports = {
  displayInterestPage,
  fetchInterests,
  createInterest,
  fetchUserInterests,
  createUserInterest
}