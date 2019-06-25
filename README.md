# LIRI-bot

Much like queen Siri, Liri is a bot that helps you search for random tidbits of knowledge. Liri can search for movies, songs, concerts and has an option to do whatever she wants. In order to get the most out of Liri, please read on.
Live Link: https://mcollums.github.io/liri-bot/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Create a file named .env, add the following to it, replacing the values with your Spotify API keys (no quotes) once you have them:

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

### Functionality

Liri can run four different commands...

**concert-this**
This uses the Axios npm to make an ajax request to the Bands in Town API. It will display the top four results of your chosen artist if they have any upcoming events.

```

node filename.js concert-this artist-name

node liri.js concert-this The Strokes

```

**spotify-this-song**
This command uses the Node-Spotify API to search for your chosen song and returns the top four results. Users are also able to click on the url to preview the song.
```

node filename.js spotify-this-song song-name

node liri.js spotify-this-song Never Gonna Give You Up

```

**movie-this**
This uses the Axios npm to make an ajax request to the OMDb API. It will display the top result for the keyword or movie title that was entered.
```

node filename.js movie-this movie-title

node liri.js movie-this Isle of Dogs

```

**do-what-it-says**
Do what it says is a mystery surprise! Run it to find out :-)
```

node filename.js do-what-it-says

node liri.js do-what-it-says

```


[Please follow this link for a preview of the app.](https://youtu.be/9-IEOJb5NYQ)


## Built With

* [Moment.js](https://www.npmjs.com/package/moment) - Formatting dates for Bands in Town results
* [Axios](https://www.npmjs.com/package/axios) - Grab data from OMDb API and Bands in Town API
* [DotEnv](https://www.npmjs.com/package/dotenv) - Used to keep Spotify password locally
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) - Used to get data from Spotify


## Author

* **Michelle Collums** - *Engineer* - [mcollums](https://github.com/mcollums)
