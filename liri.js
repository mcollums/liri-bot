
// Make it so liri.js can take in one of the following commands:

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.

// concert-this
// - This will search the Bands in Town Artist Events API("https://rest.bandsintown.com/artists/" + 
// artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// - Name of the venue
// - Venue location
// + Date of the Event(use moment to format this as "MM/DD/YYYY")

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

require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var chalk = require("chalk");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var keyword = process.argv.slice(3).join(" ");
runSwitch();

function getOMDB() {
    var movieName = "Princess Mononoke";
    if (keyword) {
        movieName = keyword;
        console.log(chalk.blue("\nResults for movies titled: " + movieName + "\n"));
    } else {
        console.log(chalk.blue("You didn't enter a movie, so here are results for 'Princess Mononoke'."));
    }

    queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=eb91f19f";

    axios.get(queryURL).then(
        function (response) {
            // var omdbObject = JSON.stringify(response.data);
            var obj = response.data;

            if (obj.length === undefined) {
                console.log(chalk.blue("Sorry, there are no results for " + movieName + " :-(\n"));
            } else {
                console.log(chalk.blue("Movie Title: " + obj.Title));
                console.log(chalk.blue("Release Year: " + obj.Year));
                console.log(chalk.blue("IMDB Rating: " + obj.imdbRating));
                console.log(chalk.blue("Rotten Tomatoes Rating: " + (obj.Ratings[1].Value)));
                console.log(chalk.blue("Country: " + obj.Country));
                console.log(chalk.blue("Languages: " + obj.Language));
                console.log(chalk.blue("Plot: " + obj.Plot));
                console.log(chalk.blue("Actors: " + obj.Actors));
            }

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


function getBIT() {
    var artist = "The Strokes";

    if (keyword) {
        artist = keyword;
        console.log(chalk.green("\nResults for " + artist + " shows: \n"));
    } else {
        console.log(chalk.green("You didn't enter a song, so here are results from Bands In Town for 'The Strokes'."));
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            var obj = response.data;
            var count = 1;
            var bitCount = 0;

            if (obj.length === 0) {
                console.log(chalk.green("Sorry, there are no upcoming shows for " + artist + " :-(\n"));
            } else {
                obj.forEach(function (event) {
                    if (bitCount <= 3) {
                        console.log(chalk.green("Result #" + count));
                        console.log(chalk.green("Venue Name: " + event.venue.name));
                        console.log(chalk.green("Venue Location: " + event.venue.city + "," + event.venue.country));
                        var date = moment(event.datetime).format("L");
                        console.log(chalk.green("Show Date: " + date + "\n"));
                        count++;
                    }
                    bitCount++;
                })
            }


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



function getSpotify() {
    var song = "Enjoy the Silence";

    if (keyword) {
        song = keyword;
        console.log(chalk.magenta("Spotify results for " + song + ".\n"));
    } else {
        console.log(chalk.magenta("You didn't enter a song, so here are Spotify results for 'Enjoy the Silence'."));
    }

    spotify.search({ type: 'track', query: song })
        .then(function (response) {
            var obj = response.tracks.items;
            count = 0;
            spotifyCount = 1;

            if (obj.length === 0) {
                console.log(chalk.magenta("Sorry, there are no results for " + song + " :-(\n"));
            } else {
                obj.forEach(function (result) {
                    if (spotifyCount <= 3) {
                        console.log(chalk.magenta("Result #" + spotifyCount));
                        console.log(chalk.magenta("Artist Name: " + (result.artists[0].name)));
                        console.log(chalk.magenta("Song: " + (result.name)));
                        console.log(chalk.magenta("Album: " + (result.album.name)));
                        console.log(chalk.magenta("Preview: " + (result.preview_url) + "\n"));
                        count++;
                    }
                    spotifyCount++;
                })
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doThis() {
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        action = dataArr[0];
        keyword = dataArr[1];

        runSwitch();
    });
}

function runSwitch() {
    switch (action) {
        case "concert-this":
            getBIT();
            break;
        case "spotify-this-song":
            getSpotify();
            break;
        case "movie-this":
            getOMDB();
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            console.log("Sorry, that's not a LIRI command. Please select: movie-this, spotify-this-song, do-what-it-says or concert-this followed by a keyword.");
    }
}