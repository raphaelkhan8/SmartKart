const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('234567', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('345678', 10)
  },
  {
    name: 'Person 1',
    email: 'person1@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Person 2',
    email: 'person2@example.com',
    password: bcrypt.hashSync('234567', 10)
  },
  { name: 'Person 3',
    email: 'person3@example.com',
    password: bcrypt.hashSync('345678', 10)
  },
]

module.exports = users