// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let result = moviesArray.map((movie) => movie.director);
  return result;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  let result = moviesArray.filter(
    (movie) =>
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  );
  let numOfMovies = result.reduce((accu) => accu + 1, 0);
  return numOfMovies;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  let result = moviesArray.reduce((accu, movie) => {
    if (movie.score !== undefined) {
      return accu + movie.score;
    } else {
      return accu;
    }
  }, 0);
  let average = Math.round((result / moviesArray.length) * 100) / 100;
  return average;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let result = moviesArray.filter((movie) => {
    return movie.genre.includes("Drama");
  });
  if (result.length === 0) {
    return 0;
  }
  let dramaSum = result.reduce((accu, movie) => {
    if (movie.score !== undefined) {
      return accu + movie.score;
    } else {
      return accu;
    }
  }, 0);
  //   let dramaSum = result.reduce((accu,movie) => accu + movie.score , 0);
  let avgDrama = Math.round((dramaSum / result.length) * 100) / 100;
  return avgDrama;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray.slice().sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    } else {
      return a.year - b.year;
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let result = moviesArray
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((movie) => movie.title);

  return result.splice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let result = moviesArray.map((movie) => {
    const hourMatch = movie.duration.match(/(\d+)\s*h/);
    const minMatch = movie.duration.match(/(\d+)\s*min/);

    const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;

    return {
      ...movie,
      duration: hours * 60 + minutes,
    };
  });
  console.log(result);
  return result;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
//[{ year: 2007, score: 8 }]
/*

[
      { year: 2000, score: 9 },
      { year: 2000, score: 8 },
      { year: 1978, score: 10 },
      { year: 1978, score: 7 },
]

{
2000: [{ year: 2000, score: 9 },{ year: 2000, score: 8 }],
1978:[{ year: 1978, score: 10 },{ year: 1978, score: 7 }]
}

{
2000: 8.5,
1978: 8.5
}

max=8.5

year1 = 2000
yaer2 = 1978
*/
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }
  const moviesDic = {};

  for (const movie of moviesArray) {
    moviesDic[movie.year] = moviesDic[movie.year] || [];
    moviesDic[movie.year].push(movie);
  }

  for (const key in moviesDic) {
    moviesDic[key] =
      moviesDic[key].reduce(
        (accu, currentValue) => (accu += currentValue.score),
        0
      ) / moviesDic[key].length;
  }

  let allValueOfDic = Object.values(moviesDic);
  let max = Math.max(...allValueOfDic);

  let year, year1, year2;
  Object.keys(moviesDic).forEach((key) => {
    if (moviesDic[key] === max && year1 === undefined) {
      year1 = key;
    } else if (moviesDic[key] === max && year2 === undefined) {
      year2 = key;
    }
  });

  if (year2 !== undefined) {
    year = year1 < year2 ? year1 : year2;
  } else {
    year = year1;
  }

  return `The best year was ${year} with an average score of ${max}`;
}
