let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

tabs.forEach((item, i) => {
    item.addEventListener('click', () => {
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
        tabsContent.forEach(content => {
            content.classList.remove('active');
        });
        
        item.classList.add('tabheader__item_active');
        tabsContent[i].classList.add('active');
    });
});

const deadline = '2021-02-01';

function getTimeRemaining(endtime) {
    const difference = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours = Math.floor((difference / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((difference /1000 / 60) % 60),
        seconds = Math.floor((difference / 1000) % 60);

    return {
        'difference': difference,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function setClock(selector, endtime) {
    const clock = document.querySelector(selector),
        days = clock.querySelector('#days'),
        hours = clock.querySelector('#hours'),
        minutes = clock.querySelector('#minutes'),
        seconds = clock.querySelector('#seconds');
        countdown = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const timer = getTimeRemaining(endtime);

            days.innerHTML = timer.days;
            hours.innerHTML = timer.hours;
            minutes.innerHTML = timer.minutes;
            seconds.innerHTML = timer.seconds;

            if (timer.difference == 0) {
                clearInterval(countdown);
            }
        }
}

setClock('.timer', deadline);

const contactBtn = document.querySelectorAll('[data-modal'),
    closeBtn = document.querySelector('[data-close'),
    modal = document.querySelector('.modal');

function showModal() {
    modal.classList.add('active');
     document.body.style.overflow = 'hidden';
    //  clearInterval(modalPopTime);
    // clearInterval(openModalTimer);
}

contactBtn.forEach(item => {
    item.addEventListener('click', showModal);
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');

    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape') {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

function showModalBottom() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalBottom);
    }
}
window.addEventListener('scroll', showModalBottom);

// Nutrition card class

class NutritionCard {
    constructor(src, alt, title, text, price, parent) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
        this.convert = 2.5;
        this.convertBYR();
        this.parent = parent;
    }

    convertBYR() {
        this.price = this.price * this.convert;
    }

    render() {
        const parentElement = document.querySelector(this.parent),
            card = document.createElement('div');

        card.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `

        parentElement.append(card);
    };
}

const premium = new NutritionCard('img/tabs/elite.jpg', 'elite', 'Меню "Премиум"', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 40, '.menu__field .container').render(),
      fitness = new NutritionCard('img/tabs/vegy.jpg', 'fitness', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 10, '.menu__field .container').render(),
      vegy = new NutritionCard('img/tabs/post.jpg', 'vegy', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 20, '.menu__field .container').render();

