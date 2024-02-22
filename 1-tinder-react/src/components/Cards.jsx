import Card from './Card';

export default function Cards({ users, handleVote }) {
	return (
		<main className="bg-white relative flex items-center justify-center p-10 ">
			{users.length > 0 ? (
				users.map((user) => {
					return (
						<Card
							key={user.login.uuid}
							user={user}
							handleVote={handleVote}
						/>
					);
				})
			) : (
				<h1>no more Users</h1>
			)}
		</main>
	);
}
