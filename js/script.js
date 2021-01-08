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
        checkbox = form.querySelector('[type="checkbox"]');

    const deleteItems = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const sortSmth = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortSmth(movieDB.movies);

        films.forEach((item, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i+1} ${item}
                <div class="delete"></div>
            </li>`;
        });

        const trashCans = document.querySelectorAll('.delete');

        trashCans.forEach((item, i) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                movieDB.movies.splice(i, 1);
                console.log(movieDB.movies)

                createMovieList(movieDB.movies, movieList);
            });
        });
    }

    deleteItems(advImg);
    createMovieList(movieDB.movies, movieList);

    bg.style.background = 'url(img/bg.jpg) center center/cover no-repeat';

    title.innerHTML = 'Драма';


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let favourite = checkbox.checked;
        
        if(filmInput.value) {
            if(filmInput.value.length > 21) {
                filmInput.value = `${filmInput.value.substring(0, 21)}...`;
            }
            movieDB.movies.push(filmInput.value);
            sortSmth(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }

        if(favourite) {
            console.log('Добавлено в любимые фильмы')
        } else {
            console.log('Не любимый фильм');
        }

        e.target.reset();
    });
})

