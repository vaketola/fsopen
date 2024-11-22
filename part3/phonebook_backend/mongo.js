const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
    console.log('command usage:')
    console.log('print all: node mongo.js <password>')
    console.log('add a new: node mongo.js <password> <name> <number>')
    
    process.exit(1)
} 

const password = process.argv[2]
const url = `mongodb+srv://vaketola-fsopen:${password}@fsopen.pzqao.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fsopen`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:   String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}

if (process.argv.length === 5) {
    const name   = process.argv[3]
        const number = process.argv[4]
        const person = new Person({
            "name":   name, 
            "number": number
        })

        person.save().then(() => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
            process.exit(1)
        })
}
