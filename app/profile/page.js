"use client"

import Loader from "@components/Loader"
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const MyProfile = () => {
	const router = useRouter()
	const { data: session } = useSession()

	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchPosts = async () => {
		setLoading(true)
		const response = await fetch(`/api/users/${session?.user.id}/posts`)
		const data = await response.json()

		setPosts(data)
		setLoading(false)
	}

	useEffect(() => {
		if (session?.user.id) fetchPosts()
		else router.push("/")
	}, [session?.user.id])

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = async (data) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${data._id.toString()}`, {
					method: "DELETE",
				})

				const filteredPosts = posts.filter((item) => item._id !== data._id)
				setPosts(filteredPosts)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return loading ? (
		<Loader />
	) : (
		<Profile
			name="My"
			desc="Welcome to your personalized page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}
export default MyProfile
