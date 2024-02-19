const maxSwipeDistance = 170;
let deltaX;
let distanceX;
let isAnimating = false; // <-still no idea

function startgrab(event) {
	if (isAnimating) {
		return;
	}
	isAnimating = true;

	const startGrabPoint = event.pageX;
	const actualElement = event.target.closest('article');

	if (!actualElement) {
		return;
	}
	document.addEventListener('mousemove', moveDistance);
	document.addEventListener('mouseup', stopGrab);

	function moveDistance(e) {
		distanceX = e.pageX - startGrabPoint;
		actualElement.style.transform = `translateX(${distanceX}px) rotate(${
			distanceX / 10
		}deg)`;

		if (distanceX < 0) {
			actualElement.querySelector('#nope').style.opacity = '1';
			actualElement.querySelector('#like').style.opacity = '0';
		}
		if (distanceX > 0) {
			actualElement.querySelector('#like').style.opacity = '1';
			actualElement.querySelector('#nope').style.opacity = '0';
		}
	}

	function stopGrab(event) {
		deltaX = Math.abs(distanceX);
		if (deltaX > maxSwipeDistance) {
			actualElement.style.transform = `translateX(${200}px) rotate(${
				distanceX / 10
			}deg)`;
			actualElement.remove();
		} else {
			actualElement.style.transform = `translateX(0px) rotate(0deg)`;
			actualElement.querySelector('#like').style.opacity = '0';
			actualElement.querySelector('#nope').style.opacity = '0';
		}
		document.removeEventListener('mousemove', moveDistance);
		document.removeEventListener('mouseup', stopGrab);

		isAnimating = false;
	}
}

document.addEventListener('mousedown', startgrab);
