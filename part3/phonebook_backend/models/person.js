require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to MongoDB', error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function(v) {
                // Some people, when confronted with a problem, think 
                // "I know, I'll use regular expressions." 
                // Now they have two problems.
                return /^\d{2,3}-\d+$/.test(v)
            }
        }
    }
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)
module.exports = mongoose.model('Person', personSchema)
