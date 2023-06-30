const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://jasonzheng892:${password}@cluster0.7z4vwju.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person.name + ' ' + person.number)
		})
		mongoose.connection.close()
	})
}
else {
	const person = new Person({
		name: name,
		number: number,
	})

	person.save().then(() => {
		console.log('added ' + name + ' number ' + number + ' to phonebook')
		mongoose.connection.close()
	})
}
