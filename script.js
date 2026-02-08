// script.js - Анимированные снежинки
window.addEventListener('load', function() {
    console.log('❄️ Инициализация снежинок...');
    
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        console.error('Контейнер #particles-js не найден!');
        return;
    }
    
    if (typeof particlesJS === 'undefined') {
        console.error('Библиотека particles.js не загружена!');
        return;
    }
    
    // Конфигурация снежинок
    try {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80, // Количество снежинок
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff" // Белые снежинки
                },
                shape: {
                    type: "circle", // Можно использовать "circle" или добавить "star"
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 6 // Шестиугольники как снежинки
                    }
                },
                opacity: {
                    value: 0.7,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false, // Отключаем линии между снежинками
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5, // Медленное падение
                    direction: "bottom", // Направление вниз
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse" // Снежинки разлетаются от курсора
                    },
                    onclick: {
                        enable: true,
                        mode: "push" // При клике появляются новые снежинки
                    }
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
        
        console.log('✅ Снежинки успешно инициализированы!');
        
        // Добавляем зимний фон
        particlesContainer.style.background = 'linear-gradient(180deg, #1a2980 0%, #26d0ce 100%)';
        
        // Добавляем эффект вьюги
        createSnowStorm();
        
    } catch (error) {
        console.error('❌ Ошибка:', error);
        particlesContainer.style.background = 'linear-gradient(180deg, #1a2980 0%, #26d0ce 100%)';
    }
});

// Функция для создания эффекта снежной бури
function createSnowStorm() {
    const container = document.getElementById('particles-js');
    
    // Добавляем большие снежинки на передний план
    for (let i = 0; i < 15; i++) {
        const bigSnowflake = document.createElement('div');
        bigSnowflake.innerHTML = '❄️';
        bigSnowflake.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            color: rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3});
            top: -50px;
            left: ${Math.random() * 100}%;
            animation: fallBig ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
            pointer-events: none;
            user-select: none;
        `;
        container.appendChild(bigSnowflake);
    }
    
    // Добавляем средние снежинки
    for (let i = 0; i < 25; i++) {
        const mediumSnowflake = document.createElement('div');
        mediumSnowflake.innerHTML = '❅';
        mediumSnowflake.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 15 + 10}px;
            color: rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2});
            top: -30px;
            left: ${Math.random() * 100}%;
            animation: fallMedium ${Math.random() * 8 + 3}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
            z-index: 1;
            pointer-events: none;
            user-select: none;
        `;
        container.appendChild(mediumSnowflake);
    }
    
    // Добавляем CSS анимации для снежинок
    const snowStyle = document.createElement('style');
    snowStyle.textContent = `
        @keyframes fallBig {
            0% {
                transform: translateY(-50px) translateX(0px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(calc(100vh + 50px)) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                opacity: 0.3;
            }
        }
        
        @keyframes fallMedium {
            0% {
                transform: translateY(-30px) translateX(0px) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(calc(100vh + 30px)) translateX(${Math.random() * 80 - 40}px) rotate(180deg);
                opacity: 0.2;
            }
        }
        
        /* Мерцание снежинок */
        @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        /* Добавляем мерцание некоторым снежинкам */
        .twinkle {
            animation: twinkle 2s infinite alternate;
        }
    `;
    document.head.appendChild(snowStyle);
    
    // Добавляем мерцание случайным снежинкам
    setTimeout(() => {
        const snowflakes = container.querySelectorAll('div');
        snowflakes.forEach(flake => {
            if (Math.random() > 0.7) {
                flake.classList.add('twinkle');
            }
        });
    }, 1000);
}

// Обновление даты в футере
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    
    // Добавляем зимнюю иконку
    const icon = document.querySelector('.fa-cloud-arrow-down');
    if (icon) {
        icon.className = 'fas fa-snowflake';
    }
});

function updateDate() {
    const dateSpan = document.getElementById('current-date');
    if (dateSpan) {
        const now = new Date();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        dateSpan.textContent = now.toLocaleDateString('ru-RU', options);
    }
}

// Эффект вьюги при скролле
let windStrength = 0;
window.addEventListener('scroll', function() {
    windStrength = Math.min(window.scrollY / 100, 3);
    
    // Обновляем направление ветра для snowflakes
    const snowflakes = document.querySelectorAll('#particles-js > div');
    snowflakes.forEach(flake => {
        const currentAnimation = flake.style.animationName;
        if (currentAnimation && (currentAnimation.includes('fallBig') || currentAnimation.includes('fallMedium'))) {
            const duration = parseFloat(flake.style.animationDuration) || 5;
            const newDuration = duration / (1 + windStrength * 0.3); // Снег падает быстрее при ветре
            flake.style.animationDuration = `${newDuration}s`;
        }
    });
});

// Сброс ветра при остановке скролла
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        windStrength = 0;
        const snowflakes = document.querySelectorAll('#particles-js > div');
        snowflakes.forEach(flake => {
            const currentAnimation = flake.style.animationName;
            if (currentAnimation) {
                const baseDuration = currentAnimation.includes('fallBig') ? 5 : 3;
                flake.style.animationDuration = `${baseDuration}s`;
            }
        });
    }, 100);
});

// Добавляем снежинки при клике
document.addEventListener('click', function(e) {
    if (e.target.closest('#particles-js')) return;
    
    const container = document.getElementById('particles-js');
    const clickSnowflake = document.createElement('div');
    clickSnowflake.innerHTML = '❄️';
    clickSnowflake.style.cssText = `
        position: fixed;
        font-size: 24px;
        color: white;
        top: ${e.clientY - 12}px;
        left: ${e.clientX - 12}px;
        animation: clickFall 2s ease-out forwards;
        z-index: 9999;
        pointer-events: none;
        user-select: none;
        opacity: 0.9;
    `;
    
    document.body.appendChild(clickSnowflake);
    
    // Добавляем анимацию для кликовой снежинки
    const clickStyle = document.createElement('style');
    if (!document.querySelector('#clickSnowStyle')) {
        clickStyle.id = 'clickSnowStyle';
        clickStyle.textContent = `
            @keyframes clickFall {
                0% {
                    transform: translateY(0) rotate(0deg) scale(1);
                    opacity: 0.9;
                }
                100% {
                    transform: translateY(100px) rotate(180deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(clickStyle);
    }
    
    // Удаляем снежинку после анимации
    setTimeout(() => {
        clickSnowflake.remove();
    }, 2000);
});

// Автоматическое добавление снежинок каждые 2 секунды
setInterval(() => {
    if (Math.random() > 0.5) {
        const container = document.getElementById('particles-js');
        const autoSnowflake = document.createElement('div');
        autoSnowflake.innerHTML = Math.random() > 0.5 ? '❄️' : '❅';
        autoSnowflake.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 15 + 10}px;
            color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            top: -30px;
            left: ${Math.random() * 100}%;
            animation: fallMedium ${Math.random() * 7 + 4}s linear infinite;
            z-index: 1;
            pointer-events: none;
            user-select: none;
        `;
        container.appendChild(autoSnowflake);
        
        // Ограничиваем количество снежинок
        const allSnowflakes = container.querySelectorAll('div');
        if (allSnowflakes.length > 50) {
            allSnowflakes[0].remove();
        }
    }
}, 2000);