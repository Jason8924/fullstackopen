const lodash = require('lodash')

const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0){
		return null
	}

	const mostLiked = blogs.reduce((prev, current) => {
		return prev.likes > current.likes
			? prev
			: current
	})

	return {
		title: mostLiked.title,
		author: mostLiked.author,
		likes: mostLiked.likes
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0){
		return null
	}

	const authorCount = lodash.countBy(blogs, 'author')

	const mostFrequentAuthor = Object.keys(authorCount).reduce((prev, current) => {
		return authorCount[prev] > authorCount[current]
			? prev
			: current
	})

	return {
		author: mostFrequentAuthor,
		blogs: authorCount[mostFrequentAuthor]
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0){
		return null
	}

	return null
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}