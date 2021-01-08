'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Скотт Пилигрим против...",
            "Ла-ла лэнд",
            "Одержимость",
            "Лига справедливости"
        ]
    };

    const advImg = document.querySelectorAll('.promo__adv img'),
        bg = document.querySelector('.promo__bg'),
        title = bg.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('.add'),
        filmInput = form.querySelector('.adding__input'),
        btnForm = form.querySelector('button'),
        trashCan = document.querySelectorAll('.delete'),
        checkbox = form.querySelector('[type="checkbox"]');

    advImg.forEach(item => {
        item.remove();
    });

    bg.style.background = 'url(img/bg.jpg) center center/cover no-repeat';

    title.innerHTML = 'Драма';

    movieDB.movies.sort();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let favourite = checkbox.checked;
        
        movieDB.movies.push(filmInput.value);

        if(favourite) {
            console.log('Добавлено в любимые фильмы')
        } else {
            console.log('Не любимый фильм');
        }
        console.log(movieDB.movies);

        movieDB.movies.sort();

        createMovieList(movieDB.movies, movieList);
    })

    function createMovieList(films, parent) {
        parent.innerHTML = '';

        films.forEach((item, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i+1} ${item}
                <div class="delete"></div>
            </li>`;
            console.log(item);
        });
    }
})

