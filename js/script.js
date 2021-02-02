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

const deadline = '2021-02-02';

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
    modal = document.querySelector('.modal');

function showModal() {
    modal.classList.add('active');
     document.body.style.overflow = 'hidden';
}

contactBtn.forEach(item => {
    item.addEventListener('click', showModal);
});

modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
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
    constructor(src, alt, title, text, price) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
        this.currency = 2.6;
        this.converBYR();
    }

    converBYR() {
        this.price = this.price * this.currency;
    }

    render() {
        const parentWrapper = document.querySelector('.menu__field .container'),
            card = document.createElement('div');

        card.innerHTML = `
        <div class='menu__item'>
            <img src=${this.src} alt=${this.alt}>
            <h3 class='menu__item-subtitle'>${this.title}</h3>
            <p class='menu__item-descr'>${this.text}</p>
            <div class='menu__item-divider'></div>
            <div class='menu__item-price'>
                <div class='menu__item-cost'>Цена:</div>
                <div class='menu__item-total'><span>${this.price}</span> б.p/день</div>
            </div>
        </div>
        `

        parentWrapper.appendChild(card);

    }
}

new NutritionCard(
    'img/tabs/vegy.jpg', 
    'Веган', 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    20
).render();

new NutritionCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14
).render();

new NutritionCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21
).render();

const message = {
    loading: "img/form/spinner.svg",
    success: "Success", 
    failure: "Failure",
};

const forms = document.querySelectorAll('form');

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        request.send(json);
        console.log(json);

        request.addEventListener('load', () => {
            if (request.status == 200) {
                console.log(request.response);
                form.reset();
                statusMessage.remove();
                showThanksModal(message.success);
            } else {
                showThanksModal(message.failure);            
            }
        });
    });
}

forms.forEach(item => {
    postData(item);
});

function showThanksModal(message) {
    const prevModal = document.querySelector('.modal__dialog');

    prevModal.classList.add('hide');

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class='modal__content'>
        <div class='modal__close' data-close>×</div>
        <div class="modal__title">${message}</div></div>
    `

    modal.append(thanksModal);

    // setTimeout(function() {
    //     thanksModal.remove();
    //     prevModal.classList.remove('hide');
    // }, 20000);
}
