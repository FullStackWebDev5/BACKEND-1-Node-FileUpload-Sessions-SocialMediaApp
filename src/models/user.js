let USERS = [
  {
    id: 1,
    name: 'Ram', 
    email: 'ram@gmail.com', 
    password: '123', 
    age: 25,
    imageURL: '/uploads/elon-musk.jpeg'
  },
  {
    id: 2,
    name: 'Rahul', 
    email: 'rahul@gmail.com', 
    password: '456', 
    age: 27,
    imageURL: '/uploads/sundar-pichai.jpg'
  },
  {
    id: 3,
    name: 'Shyam', 
    email: 'shyam@gmail.com', 
    password: '789', 
    age: 29,
    imageURL: '/uploads/mark-zuckerberg.jpg'
  }
]
let idCounter = 4

const USER_INTERESTS = []

const getAll = () => {
  return USERS
}

const add = (newUser) => {
  const user = {
    id: `${idCounter++}`,
    ...newUser
  }
  USERS.push(user)
  return user
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
  return USERS.find(user => user.email == email && user.password == password)
}

const getInterests = (userId) => {
  const userInt = USER_INTERESTS.find(int => int.id == userId)
  if(userInt) {
    return userInt.interests
  } else {
    return []
  }
}

const addInterest = (userId, interest) => {
  const userInt = USER_INTERESTS.find(int => int.id == userId)
  if(userInt) {
    userInt.interests.push(interest)
  } else {
    const obj = {
      id: userId,
      interests: [interest] 
    }
    USER_INTERESTS.push(obj)
  }
}

module.exports = {
  getAll,
  add,
  update,
  remove,
  checkUserExists,
  getInterests,
  addInterest
}