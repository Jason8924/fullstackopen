const mongoose = require('mongoose')

const url =
  'mongodb+srv://jasonzheng892:xJie7ipMOMA0548E@cluster0.cbbmdfy.mongodb.net/bloglist?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length === 3){
	console.log('bloglist:')
	Blog.find({}).then(result => {
		result.forEach(blog => {
			console.log(blog.title + ' ' + blog.author)
		})
		mongoose.connection.close()
	})
}
else {
	const blog = new Blog({
		title: 'asdf',
		author: 'authora',
		url: 'kek',
		likes: 4
	})

	blog.save().then(() => {
		console.log('added to bloglist')
		mongoose.connection.close()
	})
}
