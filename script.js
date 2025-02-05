const repoOwner = 'sergejsirmanov'; 
const repoName = 'step_portfolio'; 
const folderPath = 'images'; 

let images = [];
let currentIndex = 0;

async function fetchImages() {
	const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		
		images = data
			.filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
			.map(file => file.download_url);

		if (images.length > 0) {
			document.getElementById('slider-img').src = images[currentIndex];
		}
	} catch (error) {
		console.error('Ошибка загрузки изображений:', error);
	}
}

function prevSlide() {
	if (images.length > 0) {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		document.getElementById('slider-img').src = images[currentIndex];
	}
}

function nextSlide() {
	if (images.length > 0) {
		currentIndex = (currentIndex + 1) % images.length;
		document.getElementById('slider-img').src = images[currentIndex];
	}
}

// Обработчики свайпов
let touchStartX = 0;

document.getElementById('slider-img').addEventListener('touchstart', function(e) {
	touchStartX = e.touches[0].clientX; // Сохраняем начальную позицию касания
});

document.getElementById('slider-img').addEventListener('touchend', function(e) {
	const touchEndX = e.changedTouches[0].clientX; // Получаем конечную позицию касания

	if (touchStartX > touchEndX + 50) { // Свайп влево
		nextSlide();
	} else if (touchStartX < touchEndX - 50) { // Свайп вправо
		prevSlide();
	}
});

fetchImages();