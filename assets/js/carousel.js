/*
	Infinite-scroll image carousel, shared by all project pages.
	Expects a .carousel-container holding .carousel-item elements.
*/

document.addEventListener('DOMContentLoaded', function() {
	const carousel = document.querySelector('.carousel-container');
	if (!carousel) return;

	const items = Array.from(carousel.querySelectorAll('.carousel-item'));
	const itemCount = items.length;
	if (itemCount === 0) return;

	// Append two extra copies of the set so wheel-scrolling can loop seamlessly.
	items.forEach(item => carousel.appendChild(item.cloneNode(true)));
	items.forEach(item => carousel.appendChild(item.cloneNode(true)));

	// Item width is viewport-relative (20vw), so measure on demand rather than caching.
	const setWidth = () => carousel.firstElementChild.offsetWidth * itemCount;

	carousel.scrollLeft = setWidth();

	carousel.addEventListener('wheel', (e) => {
		e.preventDefault();

		carousel.scrollLeft += (e.deltaX + e.deltaY) / 2;

		const width = setWidth();
		if (carousel.scrollLeft >= width * 2) {
			carousel.scrollLeft -= width;
		} else if (carousel.scrollLeft <= 0) {
			carousel.scrollLeft += width;
		}
	}, { passive: false });
});
