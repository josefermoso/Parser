// The package "should" must be installed:   
// `npm install should`

fs = require('fs');
parse = require('csv-parse');


//var fs = require('fs');
//var parse = require('..');

var parser = parse({
  columns: true,
  delimiter: '\t'
}, function(err, data) {
  var genresDic = {};
  var moviesList = [];
  var genresList = [];

  if (data) {
    data.forEach(function(movie) {
      var movieMetaData = {};

      var genres = movie.Genre.split(', ');
      var genresMovieID = [];

      genres.forEach(function(genre) {
        var genreId = genresDic[genre];
        if (!genreId) {
          var amountOfKeys = Object.keys(genresDic).length;
          genreId = amountOfKeys;
          genresDic[genre] = genreId;
          genresList.push({
            "name": genre,
            "id": genreId
          });
        }
        genresMovieID.push(genreId);
      });
      moviesList.push({
        "imdbID": movie.imdbID,
        "genre": genresMovieID,
        "type": movie.Type
      });
      //obtener las peliculas
      //pedir la key
      //si no esta la aagrego
      //ponerle la key
      //data[1].Genre.split(',');
    });
  }
  fs.writeFile(__dirname + '/genresFinal.txt', JSON.stringify({
    "genres": genresList
  }), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
  fs.writeFile(__dirname + '/moviesFinal.txt', JSON.stringify({
    "data": moviesList
  }), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  //console.log(genresDic);
  //console.log(moviesGenreDic);
});

fs.createReadStream(__dirname + '/omdbFull0916/todo.txt').pipe(parser);

/*
`node samples/header-based-columns.js`
[ { Foo: 'first', Bar: 'row', Baz: 'items' },
  { Foo: 'second', Bar: 'row', Baz: 'items' } ]
*/