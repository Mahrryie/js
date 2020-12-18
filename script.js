"use strict";
const numberOfFilms = +prompt('Сколько вы уже посмотрели?');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

for (let i = 0; i < 1; i++) {
    let a = prompt("Один из последних просмотренных фильмов?"),
        b = prompt("На сколько оцените его?");

    if (a == ' ' || a == null || a.length >= 50 ) {
        i--;
    }
    personalMovieDB.movies[a] = b;

}

if (personalMovieDB.count < 10) {
    alert("Просмотрено мало фильмов");
} else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
    alert('Вы классический зритель');
} else if (personalMovieDB.count > 30) {
    alert("Вы киноман!");
} else {
    alert("Произошла ошибка");
}


console.log(personalMovieDB);




