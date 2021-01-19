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