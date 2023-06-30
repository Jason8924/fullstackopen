const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting')

mongoose.connect(url)

	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [3, 'Name needs to be at least three characters long'],
		required: true
	},
	number: {
		type: String,
		required: true,
		validate: {
			validator: (number) => {
				if ((number.length > 8 && (number.match(/-/g) || []).length === 1 && (number[2] === '-' || number[3] === '-'))){
					return true
				}
				return false
			},
			message: 'Must have at least 8 digits and have only one "-" after the first two or three digits'
		}
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model('Person', personSchema)