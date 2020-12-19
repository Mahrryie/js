"use strict";
let numberOfFilms;

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function start() {
    while (numberOfFilms == ' ' || numberOfFilms == null || isNaN(numberOfFilms) ) {
        numberOfFilms = +prompt('Сколько вы уже посмотрели?');
        console.log(numberOfFilms);
    }
}

start();

function rememberMyFilms() {
    for (let i = 0; i < 1; i++) {
        let a = prompt("Один из последних просмотренных фильмов?"),
            b = prompt("На сколько оцените его?");
    
        if (a == '' || a == null || a.length >= 50 ) {
            i--;
        }
        personalMovieDB.movies[a] = b;
    }
}

rememberMyFilms();

function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        alert("Просмотрено мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
        alert('Вы классический зритель');
    } else if (personalMovieDB.count > 30) {
        alert("Вы киноман!");
    } else {
        alert("Произошла ошибка");
    }
}

detectPersonalLevel();

function showMyDB(visible) {
    if (!visible) {
        console.log('is hidden', personalMovieDB);
    }
}

showMyDB(personalMovieDB.privat);

function writeYourGenres() {
    for (let i = 0; i < 3; i++) {
        let a = prompt(`Ваш любимый жанр под номером ${i+1}`);
    personalMovieDB.genres.push(a);
    }
}

writeYourGenres();


