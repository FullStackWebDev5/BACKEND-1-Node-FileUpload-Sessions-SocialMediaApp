const INTERESTS = [
  {
    id: 1,
    name: 'Swimming',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzs5f8FGz7DJcrdoE0u-KvmzicHdWf173HlA&s'
  },
  {
    id: 2,
    name: 'Coding',
    imageURL: 'https://www.springboard.com/blog/wp-content/uploads/2022/09/programmng-language.jpg'
  },
  {
    id: 3,
    name: 'Playing Cricket',
    imageURL: 'https://i0.wp.com/villagecricket.co/wp-content/uploads/2022/08/image.png'
  },
]
let idCounter = 4

const getAll = () => {
  return INTERESTS
}

const add = (newInterest) => {
  const interest = {
    id: `${idCounter++}`,
    ...newInterest
  }
  INTERESTS.push(interest)
  return interest
}

const update = (id, updatedInterest) => {
  const index = INTERESTS.findIndex(user => user.id == id)
  INTERESTS[index] = {
    ...INTERESTS[index],
    ...updatedInterest
  }
}

const remove = (id) => {
  const index = INTERESTS.findIndex(user => user.id == id)
  INTERESTS.splice(index, 1)
}

const getInterest = (id) => {
  return INTERESTS.find(int => int.id == id)
}

module.exports = {
  getAll,
  add,
  update,
  remove,
  getInterest
}