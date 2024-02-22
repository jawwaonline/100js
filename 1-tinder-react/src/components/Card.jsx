import { useState, useEffect } from 'react';

export default function Card({ user, handleVote }) {
	const [movedDistance, setMovedDistance] = useState(0);
	const [hotOrNot, setHotOrNot] = useState(null);
	let actualPosition;
	let distance;

	// useEffect(() => {
	// 	console.log('movedDistance:', movedDistance);
	// }, [movedDistance]);

	const handleClick = () => {
		handleVote(user);
	};

	function onGrab(event) {
		const startX = event.clientX;

		function onMove(e) {
			actualPosition = e.clientX;
			distance = actualPosition - startX;

			if (distance < 0) {
				setHotOrNot('hot');
			} else if (distance > 0) {
				setHotOrNot('not');
			}

			setMovedDistance(distance);
		}

		function onEnd() {
			const absoluteDistance = Math.abs(distance);
			if (absoluteDistance > 200) {
				handleClick(user);
			}
			if (absoluteDistance < 200) {
				setMovedDistance(0);
				setHotOrNot(null);
			}
			removeEventListener('mousemove', onMove);
			removeEventListener('mouseup', onEnd);
		}
		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onEnd);
	}

	return (
		// LOADING ???

		<section className="absolute h-full w-full  flex justify-center items-center  ">
			<article
				//onClick={handleClick}
				onMouseDown={(event) => onGrab(event)}
				className={`absolute transition rounded-3xl w-[80%] h-[80%] bg-slate-400 z-10 border-4 border-slate-600 overflow-hidden select-none`}
				style={{
					transform: `translateX(${movedDistance}px) rotate(${
						movedDistance * 0.1
					}deg)`
				}}
			>
				<h3
					className={
						'top-20 left-10 absolute text-3xl border-2 px-4 py-2 border-red-600 bg-red-200 text-red-600 rounded-2xl uppercase -rotate-45 transition ease-in-out duration-700' +
						(hotOrNot === 'hot' ? ' opacity-100' : ' opacity-0')
					}
				>
					Hot
				</h3>
				<h3
					className={
						'top-20 right-10 absolute text-3xl border-2 px-4 py-2 border-amber-600 text-amber-600 bg-amber-200 rounded-2xl uppercase -rotate-45 transition ease-in-out duration-700' +
						(hotOrNot === 'not' ? ' opacity-100' : ' opacity-0')
					}
				>
					Not
				</h3>

				<img
					src={user.picture.large}
					alt={user.name.first}
					className="w-full h-full object-cover pointer-events-none"
				/>

				<h2 className="text-3xl absolute bg-amber-200 text-black bottom-10 left-5 px-4 py-2 rounded border-none">
					{user.name.first}
					<span className="text-sm"> {user.dob.age}</span>
				</h2>
			</article>
		</section>
	);
}
