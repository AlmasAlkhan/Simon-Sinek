// Скрипт для управления презентацией Simon Sinek

// Получаем все слайды
let currentSlide = 1;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Функция для показа определенного слайда
function showSlide(n) {
    // Проверяем границы
    if (n > totalSlides) {
        currentSlide = totalSlides;
    }
    if (n < 1) {
        currentSlide = 1;
    }
    
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Показываем текущий слайд
    slides[currentSlide - 1].classList.add('active');
    
    // Обновляем счетчик
    updateCounter();
}

// Функция для изменения слайда
function changeSlide(direction) {
    currentSlide += direction;
    
    // Проверяем границы
    if (currentSlide > totalSlides) {
        currentSlide = totalSlides;
    }
    if (currentSlide < 1) {
        currentSlide = 1;
    }
    
    showSlide(currentSlide);
}

// Обновление счетчика слайдов
function updateCounter() {
    document.getElementById('slideCounter').textContent = `${currentSlide} / ${totalSlides}`;
}

// Управление с клавиатуры
document.addEventListener('keydown', function(event) {
    // Стрелка влево или PageUp - предыдущий слайд
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        changeSlide(-1);
    }
    // Стрелка вправо или PageDown - следующий слайд
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        changeSlide(1);
    }
    // Home - первый слайд
    if (event.key === 'Home') {
        currentSlide = 1;
        showSlide(currentSlide);
    }
    // End - последний слайд
    if (event.key === 'End') {
        currentSlide = totalSlides;
        showSlide(currentSlide);
    }
});

// Свайп на мобильных устройствах
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    // Свайп влево - следующий слайд
    if (touchEndX < touchStartX - 50) {
        changeSlide(1);
    }
    // Свайп вправо - предыдущий слайд
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    console.log('Презентация загружена. Используйте стрелки для навигации.');
    
    // Автоматический полноэкранный режим при первом клике
    let firstClick = true;
    document.addEventListener('click', function() {
        if (firstClick && !document.fullscreenElement) {
            firstClick = false;
            // Предлагаем полноэкранный режим
            if (confirm('Открыть презентацию в полноэкранном режиме?')) {
                document.documentElement.requestFullscreen();
            }
        }
    }, { once: true });
});

// Функция для перехода к конкретному слайду (может пригодиться)
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        showSlide(currentSlide);
    }
}

// Полноэкранный режим (опционально)
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// F11 для полноэкранного режима
document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
    }
});

