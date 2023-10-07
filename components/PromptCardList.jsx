import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

export default PromptCardList
