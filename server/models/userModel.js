const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true
  }, 
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

// middleware to encrypt password before saving User
userSchema.pre('save', async function(next) {
  // if password is not being changed or created, move on to the next function
  if (!this.isModified('password')) {
    next()
  }
  // else, generate a salt and hash the password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// method to compare input password with database password
userSchema.methods.matchPassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User