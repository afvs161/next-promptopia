"use client"

import Loader from "@components/Loader"
import Profile from "@components/Profile"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const UserProfile = ({ params }) => {
	const searchParams = useSearchParams()
	const userName = searchParams.get("name")

	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchPosts = async () => {
		setLoading(true)
		const response = await fetch(`/api/users/${params?.id}/posts`)
		const data = await response.json()

		setPosts(data)
		setLoading(false)
	}

	useEffect(() => {
		if (params?.id) fetchPosts()
	}, [params?.id])

	return loading ? (
		<Loader />
	) : (
		<Profile
			name={`${userName}'s`}
			desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
			data={posts}
		/>
	)
}

export default UserProfile
