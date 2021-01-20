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

// const modalPopTime = setTimeout(showModal, 3000);
// function showModalByScroll() {
//     if ( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
//         showModal();

//         window.removeEventListener('scroll', showModalByScroll);
//     }
// }
// window.addEventListener('scroll', showModalByScroll);

// const openModalTimer = setTimeout(showModal, 3000);

function showModalBottom() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalBottom);
    }
}
window.addEventListener('scroll', showModalBottom);