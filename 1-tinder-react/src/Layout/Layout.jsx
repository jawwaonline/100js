// import { users } from '../data/data';
import Cards from '../components/Cards';
import { useEffect, useState } from 'react';

export default function Layout() {
	const [users, setUsers] = useState([]);
	const [data, setData] = useState([]);

	const handleVote = (user) => {
		const newUsers = [];
		users.forEach((olduser) => {
			if (olduser.login.uuid !== user.login.uuid) {
				newUsers.push(olduser);
			}
		});

		setUsers(newUsers);
	};
	// create filtered users
	// create a function to manipulate the filtered users
	// map over the filtered users in cards for users that are not voted

	useEffect(() => {
		const getUsers = async () => {
			try {
				const data = await fetch(
					'https://randomuser.me/api/?results=5'
				);
				const { results } = await data.json();

				setUsers(results);
			} catch (error) {
				console.log(error);
			}
		};
		getUsers();
	}, []);

	return (
		<div className="bg-red-200 h-[1000px] w-[500px] grid grid-rows-[50px_1fr_50px] border-2 rounded-2xl">
			<header className="bg-slate-400 text-red-600 rounded-t-2xl">
				❤️
			</header>
			<Cards users={users} handleVote={handleVote} />
			<footer className="bg-slate-400 rounded-b-2xl">✅➡️</footer>
		</div>
	);
}
