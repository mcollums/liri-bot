
// Make it so liri.js can take in one of the following commands:

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.

// concert-this
// This will search the Bands in Town Artist Events API("https://rest.bandsintown.com/artists/" + 
// artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event(use moment to format this as "MM/DD/YYYY")

// spotify-this-song
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

// movie-this
// This will output the following information to your terminal/bash window:
//   - Title of the movie.
//   - Year the movie came out.
//   + IMDB Rating of the movie.
//   + Rotten Tomatoes Rating of the movie.
//   - Country where the movie was produced.
//   - Language of the movie.
//   - Plot of the movie.
//   - Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, 
// the OMDB API requires an API key. You may use trilogy.

// do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt
// Edit the text in random.txt to test out the feature for movie-this and concert-this.


//Grab what action the user wants to do
// var action = process.argv[2];

require("dotenv").config();
var keys = require("./keys.js");
var chalk = require("chalk");
var axios = require("axios");


function getOMDB() {
    movieName = "The Grand Budapest Hotel";
    queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=eb91f19f";

    axios.get(queryURL).then(
        function (response) {
            var omdbObject = JSON.stringify(response.data);
            var obj = response.data;

            // console.log(chalk.green(omdbObject));
            // console.log(chalk.magenta(JSON.stringify(obj.Ratings)));
            // console.log(chalk.magenta(JSON.stringify(obj.Ratings[1].Value)));

            console.log(chalk.blue("Movie Title: " + obj.Title));
            console.log(chalk.blue("Release Year: " + obj.Year));
            console.log(chalk.blue("IMDB Rating: " + obj.imdbRating));
            console.log(chalk.blue("Rotten Tomatoes Rating: " + (obj.Ratings[1].Value)));
            console.log(chalk.blue("Country: " + obj.Country));
            console.log(chalk.blue("Languages: " + obj.Language));
            console.log(chalk.blue("Plot: " + obj.Plot));
            console.log(chalk.blue("Actors: " + obj.Actors));

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

// getOMDB();

function getBIT() {
    artist = "The Killers";
    queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            var obj = response.data;
            var count = 1;
            console.log(chalk.green("Results for " + artist + " shows \n"));


            obj.forEach(function (event) {
                console.log(chalk.green("Result #" + count));
                console.log(chalk.green("Venue Name: " + event.venue.name));
                console.log(chalk.green("Venue Location: " + event.venue.city + "," + event.venue.country));
                console.log(chalk.green("Show Date: " + event.datetime + "\n"));
                count++;
            })


        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}


// getBIT();

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function getSpotify() {
    spotify.search({ type: 'track', query: 'I Write Sins Not Tragedies' })
        .then(function (response) {
            //   console.log(response.tracks);
            console.log(response.tracks.items);
            var obj = response.tracks.items;
            count = 1;

            obj.forEach(function (result) {
                console.log(chalk.magenta("Result #" + count));
                console.log(chalk.magenta("Artist Name: " + JSON.stringify(result.artists)));
                console.log(chalk.magenta("Artist Name: " + JSON.stringify(result.artists["Artist Name"])));
                // console.log(chalk.magenta("Song: " + (result.name)));
                // console.log(chalk.magenta("Album: " + (result.album.name)));
                // console.log(chalk.magenta("Preview: " + (result.preview_url) + "\n"));


                count++;
            })


        })
        .catch(function (err) {
            console.log(err);
        });
}

getSpotify();