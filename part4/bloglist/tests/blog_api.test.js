const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('when there are some blogs saved', () => {
	test('get all blogs', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blogs have id property instead of _id', async() => {
		const response = await api.get('/api/blogs')
		const ids = response.body.map((blog) => blog.id)

		for (const id of ids){
			expect(id).toBeDefined()
		}
	})
})

describe('viewing a specific blog', () => {
	test('test if likes property defaults to 0 if missing', async() => {
		const newBlog = {
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await helper.blogsInDb()
		expect(response[helper.initialBlogs.length].likes).toBe(0)
	})

	test('if title is missing', async() => {
		const newBlog = {
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})

	test('if url is missing', async() => {
		const newBlog = {
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
})

describe('addition of a new blog', () => {
	test('post request', async() => {
		const newBlog = {
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await helper.blogsInDb()
		const contents = response.map(blog => blog.title)

		expect(response).toHaveLength(helper.initialBlogs.length + 1)
		expect(contents).toContain(
			'Go To Statement Considered Harmful'
		)
	})
})

describe('deletion of a blog', () => {
	test('status code 204 if id is valid', async() => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const contents = blogsAtEnd.map(blog => blog.title)

		expect(contents).not.toContain(blogToDelete.title)
	})
})

describe('update blog', () => {
	test('update blog', async() => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		const currentLikes = blogToUpdate.likes

		const updatedBlog = {
			likes: currentLikes + 1
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)

		const response = await helper.blogsInDb()
		const blogToCheck = response[0]
		expect(blogToCheck.likes).toBe(currentLikes+1)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})