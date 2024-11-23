let USERS = [
  {
    id: '1',
    name: 'Vishal Vijay Babar',
    email: 'vishal@gmail.com',
    password: '123',
    age: 25,
    imageURL: 'https://reqres.in/img/faces/1-image.jpg'
  }
]
const idCounter = 2

const getAll = () => {
  return USERS
}

const add = (newUser) => {
  USERS.push({
    id: `${idCounter++}`,
    ...newUser
  })
}

const update = (id, updatedUser) => {
  const index = USERS.findIndex(user => user.id == id)
  USERS[index] = {
    ...USERS[index],
    ...updatedUser
  }
}

const remove = (id) => {
  const index = USERS.findIndex(user => user.id == id)
  USERS.splice(index, 1)
}

const checkUserExists = (email, password) => {
  return USERS.find(user = user.email == email && user.password == password)
}

module.exports = {
  getAll,
  add,
  update,
  remove,
  checkUserExists
}