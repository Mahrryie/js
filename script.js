"use strict";

let btn = document.getElementsByTagName('p')[0];

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    showMyDB: function() {
        if (!personalMovieDB.privat) {
            console.log('is hidden', personalMovieDB);
        }
    },
    toggleVisibleMyDB: function() {
        if (!personalMovieDB.privat) {
            personalMovieDB.privat = true;
            console.log(personalMovieDB.privat);
        } else {
            personalMovieDB.privat = false;
            console.log(personalMovieDB.privat);
            personalMovieDB.showMyDB();
        }
    },
    start: function() {
        while (personalMovieDB.count == ' ' || personalMovieDB.count == null || isNaN(personalMovieDB.count) ) {
            personalMovieDB.count = +prompt('Сколько вы уже посмотрели?');
            console.log(personalMovieDB.count);
        }
    },
    rememberMyFilms: function() {
        for (let i = 0; i < 1; i++) {
            let a = prompt("Один из последних просмотренных фильмов?"),
                b = prompt("На сколько оцените его?");
        
            if (a == '' || a == null || a.length >= 50 ) {
                i--;
            }
            personalMovieDB.movies[a] = b;
        }
    },
    detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            alert("Просмотрено мало фильмов");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
            alert('Вы классический зритель');
        } else if (personalMovieDB.count > 30) {
            alert("Вы киноман!");
        } else {
            alert("Произошла ошибка");
        }
    },
    writeYourGenres: function() {
        for (let i = 0; i < 1; i++) {
            let a = prompt('Введите названия через запятую').toLowerCase();

            if (a === null || a === '') {
                i--;
            } else {
                personalMovieDB.genres = a.split(', ');
                personalMovieDB.genres.sort();
            }
        }
        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Жанр под номером ${i+1} - ${item}`);
        });
    }
};

btn.addEventListener('click', personalMovieDB.writeYourGenres);

console.log(personalMovieDB.privat);
