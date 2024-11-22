const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} 


if (process.argv.length === 3) {
    const password = process.argv[2]
    const url = `mongodb+srv://vaketola-fsopen:${password}@fsopen.pzqao.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fsopen`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name:   String,
        number: String
    })
    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
        process.exit(1)
    })
} else if (process.argv.length === 5) {
    const password = process.argv[2]
    const url = `mongodb+srv://vaketola-fsopen:${password}@fsopen.pzqao.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fsopen`

    const name   = process.argv[3]
    const number = process.argv[4]

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name:   String,
        number: String
    })
    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        "name":   {name}, 
        "number": {number}
    })

    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
        process.exit(1)
    })
}

console.log('incorrect command usage')
process.exit(1)

