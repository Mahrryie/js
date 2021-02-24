let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

tabs.forEach((item, index) => {
    item.addEventListener('click', () => {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
        tabsContent.forEach(item => {
            item.classList.remove('active');
        });

        item.classList.add('tabheader__item_active');
        tabsContent[index].classList.add('active');
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
    modal.classList.remove('hide');
    modal.classList.add('active');
     document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

contactBtn.forEach(item => {
    item.addEventListener('click', showModal);
});

modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
        closeModal();
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

const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`We can't fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
};

getResource('http://localhost:3000/menu')
.then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
        new NutritionCard(img, altimg, title, descr, price).render();
    });
});

const message = {
    loading: "img/form/spinner.svg",
    success: "Success", 
    failure: "Failure",
};

const forms = document.querySelectorAll('form');

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data,
    });

    return await res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        postData('http://localhost:3000/requests', JSON.stringify(object)).then(data => {
            console.log(data);
            showThanksModal(message.success);
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

function showThanksModal(message) {
    const prevModal = document.querySelector('.modal__dialog');

    prevModal.classList.add('hide');
    prevModal.classList.remove('active');
    showModal();
    
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class='modal__content'>
            <div class='modal__close' data-close>×</div>
            <div class='modal__title'>${message}</div>
        </div>
    `;

    modal.append(thanksModal);

    setTimeout(function() {
        thanksModal.remove();
        prevModal.classList.remove('hide');
        prevModal.classList.add('active');
        closeModal();
    }, 2000);
}

// Slider:
// 1st simple variant

// const slides = document.querySelectorAll('.offer__slide'),
//     next = document.querySelector('.offer__slider-next'),
//     prev = document.querySelector('.offer__slider-prev'),
//     current = document.querySelector('#current'),
//     total = document.querySelector('#total'),

// let sliderIndex = 1;

// const showSlides = (index) => {
//     if (index < 1) {
//         sliderIndex = slides.length;
//     } else if (index > slides.length) {
//         sliderIndex = 1;
//     }

//     slides.forEach(item => {
//         item.style.display = 'none';
//     });

//     slides[sliderIndex - 1].style.display = 'block';

//     if (slides.length < 10) {
//         total.textContent = `0${slides.length}`;
//     } else {
//         total.textContent = `${slides.length}`;
//     }
    
//     if (index < 10) {
//         current.textContent = `0${sliderIndex}`;
//     } else {
//         current.textContent = `${sliderIndex}`;
//     }
// };

// showSlides(1); 

// next.addEventListener('click', () => {
//     showSlides(++sliderIndex);
// });

// prev.addEventListener('click', () => {
//     showSlides(--sliderIndex);
// });

//2nd slider with transform


const slides = document.querySelectorAll('.offer__slide'),
    next = document.querySelector('.offer__slider-next'),
    prev = document.querySelector('.offer__slider-prev'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesInner = document.querySelector('.offer__slider-inner'),
    sliderWidth = window.getComputedStyle(slidesWrapper).width; //650px

let sliderIndex = 1,
    offset = 0;

slidesInner.style.width = 100 * slides.length + '%';

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${sliderIndex}`;
} else {
    total.textContent = `${slides.length}`;
    current.textContent = `${sliderIndex}`;
}

next.addEventListener('click', () => {
    if (offset == parseInt(sliderWidth) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += parseInt(sliderWidth);
    }

    if (sliderIndex == slides.length) {
        sliderIndex = 1;
    } else {
        sliderIndex++;
    }

    if (sliderIndex < slides.length) {
        current.textContent = `0${sliderIndex}`
    } else {
        current.textContent = `0${sliderIndex}`;
    }

    slidesInner.style.transform = `translateX(${-offset}px)`;
});

prev.addEventListener('click', () => {
 if (offset == 0) {
        offset = parseInt(sliderWidth) * (slides.length - 1);
    } else {
        offset -= parseInt(sliderWidth);
    }

    if (sliderIndex == 1) {
        sliderIndex = slides.length;
    } else {
        sliderIndex--;
    }

    if (sliderIndex < slides.length) {
        current.textContent = `0${sliderIndex}`
    } else {
        current.textContent = `0${sliderIndex}`;
    }

    slidesInner.style.transform = `translateX(${-offset}px)`;
});
