const lodash = require('lodash')

const dummy = () => {
	return 1
}

// returns the total sum of likes in all of the blog posts
const totalLikes = (blogs) => {
	return blogs.length === 0
		? 0
		: blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// returns a blog with the most likes
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

// Returns the author who has the largest amount of blogs
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

// Returns the author, whose blog posts have the largest amount of likes
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