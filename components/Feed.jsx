"use client"

import { useEffect, useRef, useState } from "react"
import PromptCardList from "./PromptCardList"
import Loader from "./Loader"
import Image from "next/image"

const Feed = () => {
	const searchInputRef = useRef(null)
	const [loading, setLoading] = useState(false)
	const [posts, setPosts] = useState([])
	const [filteredPosts, setFilteredPosts] = useState([])

	const fetchPosts = async () => {
		setLoading(true)
		const response = await fetch("/api/prompt")
		const data = await response.json()
		setPosts(data)
		setLoading(false)
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	const filterPrompts = () =>
		posts.filter(
			(item) =>
				item.creator.username
					.toLowerCase()
					.includes(searchInputRef.current.value.toLowerCase()) ||
				item.tag
					.toLowerCase()
					.includes(searchInputRef.current.value.toLowerCase()) ||
				item.prompt
					.toLowerCase()
					.includes(searchInputRef.current.value.toLowerCase())
		)

	const searchPrompt = () => {
		setFilteredPosts(filterPrompts)
	}

	const handleTagClick = (tag) => {
		searchInputRef.current.value = tag.slice(0, 1) === "#" ? tag.slice(1) : tag
		setFilteredPosts(filterPrompts)
	}

	const clearSearchInput = () => {
		searchInputRef.current.value = ""
		setFilteredPosts([])
	}

	return (
		<section className="feed">
			<form className="relative w-full max-w-lg flex-center mb-16">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					ref={searchInputRef}
					onChange={searchPrompt}
					required
					className="search_input peer"
				/>
				<Image
					src="/assets/icons/clear.svg"
					width={16}
					height={16}
					className={`absolute right-4 cursor-pointer ${
						searchInputRef.current?.value.length || "opacity-60"
					}`}
					onClick={clearSearchInput}
				/>
			</form>

			{loading ? (
				<Loader />
			) : (
				<PromptCardList
					data={
						searchInputRef.current?.value.length > 0 ? filteredPosts : posts
					}
					handleTagClick={handleTagClick}
				/>
			)}
		</section>
	)
}
export default Feed
