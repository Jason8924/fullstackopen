const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })

	response.json(blogs)
})

blogRouter.get('/:id', async (request, response, next) => {
	try {
		const blog = await Blog.findById(request.params.id)
		if (blog) {
			response.json(blog)
		}
		else {
			response.status(404).end()
		}
	}
	catch(exception){
		next(exception)
	}
})

blogRouter.post('/', async (request, response, next) => {
	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	try {
		const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	}
	catch(exception){
		next(exception)
	}
})

blogRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}
	catch(exception) {
		next(exception)
	}
})

blogRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	try{
		const blog = {
			likes: body.likes
		}

		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(updatedBlog)
	}
	catch(exception) {
		next(exception)
	}
})

module.exports = blogRouter