# DATA4SDGs-Highways

## Technology

#### Backend

We're using `node >= 7.4` with `express ^4.13.3` to serve our application and the twitter data that feeds our twitter slider. Twitter data is being fetch with the twitter js SDK: `twitter ^1.7.0`.

#### Frontend

We're using `vue ^2.0.1` as our frontend framework, `vue-router ^2.0.2` for internal routing, and `vuex ^2.0.0` for application state management.
For the application's http request console we're using `httpsnippet ^1.16.5` and for the maps visualisations we use `leaflet ^1.0.2`. Finally for the application styles we use the node implementation of sass: `node-sass ^4.2.0`.

#### Code Quality

For javascript code quality we depend on Eslint. We're using `eslint^3.7.1`  and you can find our eslint config in the `.eslintrc.js` file.

#### Tooling

This project is built on top of ES6 javascript, which means we're using ES6 modules and the latest syntax. For this to be able to run on a browser we need a module bundler and a transpiler. We're using `webpack ^1.13.2` as a module bundler and `babel ^6.0.0` as a transpiler.

## Requirements

- Node 7.4+
- NPM

## Installation

First install dependencies running in your projects folder inside the terminal:

```

npm install

````
After the installation is completed, create a new file and name it `.env`. Copy the content of the project's `.env.sample` file in it. And fill in the blanks with the appropriate values. The values correspond to the following things:
* API_BASE_URL - Map layers + datasets api base url. This should point to the _data-highways_ api.
* TWITTER_CONSUMER_KEY - twitter consumer key (needed for tweets slider).
* TWITTER_CONSUMER_SECRET - twitter consumer secret (needed for tweets slider).
* TWITTER_ACCESS_TOKEN_KEY - twitter access token key (needed for tweets slider).
* TWITTER_ACCESS_TOKEN_SECRET - twitter access token secret (needed for tweets slider).
* GOOGLE_ANALYTICS - google analytics app id
* SHOW_FEEDBACK - flag to activate the landing's page feedback form. In order, to activate it must be set to `true`.
* SHOW_RECENT_DATASETS - Boolean to enable/disable the "Recent dataset" feature on the data set page

## Usage
To run the project in development mode you need to execute the following command on your terminal:
```

npm run dev

```
This will run the project on `127.0.0.1:3000`  on your browsers window, with hot-reload activated.
To run the project in production mode you need to:
First, build the project for production with the following command:
```

 npm run build

 ```
 This will build the project in production mode with minification.

 Afterwards you'll need to run the production server with the following command:
 ```

 npm start

 ```
 This will run the project on `127.0.0.1:5000`  on your browser's window on production mode.

### Deploy
To deploy the app you'll need to setup a server running `node` with the version specified in the requirements. In the server, you'll need to create a `.env` file containing your desired environmental variables for that application's instance.

If you set up the server to do a clean installation – removing and reinstalling all dependencies – after each deploy, you don't have to worry about building for production.
The project is already configured for making a build after installing, this is being done through the `package.json` **postinstall** hook.
However, if you wish to set up your own deployment flow you just need to ensure you build for production first and start the server last. This is possible running:

 ```

npm run build
npm start

```
As an example if you wish to deploy to **Heroku** you can do it in the following way:
First, install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). Once you have heroku installed, run:
```

heroku login

```
Second, create a [named app on Heroku](https://devcenter.heroku.com/articles/creating-apps#creating-a-named-app).
Clone the DATA4SDG-Highways into your Heroku app:
```

heroku git:clone -a <NAME_OF_HEROKU_APP>
cd <NAME_OF_HEROKU_APP>

```
Finally, deploy:
```

git push heroku master

```
## Contributing
1. Fork it!

2. Create your feature branch: git checkout -b feature/my-new-feature

3. Commit your changes: git commit -am 'Add some feature'

4. Push to the branch: git push origin feature/my-new-feature

5. Submit a pull request :D

# Examples gallery

The examples gallery content can be edited in the `app/data/examples.json` file.

* id: 
* title: Human-friendly title of the visualisation. 
* url: URL of the page
* organization: 
* lastUpdate: 
* sourceCode: 
* intro: 
* content: 
* thumb: 
* html: 
* images: 

| Field name     | Required? | Description |
|----------------|-----------|-------------|
| id             | Y         | ID of the visualisation. Must be unique and not contain spaces or special characters. |
| title          | Y         | Human-friendly title of the visualisation. |
| url            | N         | URL of the page |
| author         | N         | Name of the author of the visualisation            |
| date           | N         | Date when the visualisation was published |
| sourceCode     | N         | Link to the source code of the example |
| intro          | N         | Short text describing the example. To be displayed in the gallery view. |
| content        | N         | Larger text describing the example. To be displayed in the example detail page. |
| thumb          | N         | Small thumbnail representative of the example. To be displayed in the gallery view. |
| html           | N         | HTML snippet to be embedded within the example detail page. |
| images         | N         | List of images to be displayed in the example detail page. Only displayed if no html content is passed. |

While most fields are not required, all of them are recommended - expect for having `images` and `html` simultaneously.

#### Example: 

```json
[
  {
    "id": "conflicts-related-to-protected-areas",
    "title": "Conflicts related to protected areas",
    "url": "https://gpsdd.github.io/DATA4SDGS-Highway-Examples/#/conflicts-related-to-protected-areas",
    "author": "GPSDD",
    "date": "July 2, 2018",
    "sourceCode": "https://github.com/GPSDD/DATA4SDGS-Highway-Examples/tree/master/app/scripts/components/MapVisualization",
    "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "thumb": "/static/examples/conflicts-related-to-protected-areas.png",
    "html": "<iframe src='https://gpsdd.github.io/DATA4SDGS-Highway-Examples/#/conflicts-related-to-protected-areas' width='100%' height='600px' frameborder='0'></iframe>",
    "images": [
      "/static/examples/conflicts-related-to-protected-areas.png",
      "/static/examples/regions-with-greatest-water-risks.png"
    ]
  },
  {
    "id": "regions-with-greatest-water-risks",
    "title": "Regions with greatest water risks",
    "url": "https://gpsdd.github.io/DATA4SDGS-Highway-Examples/#/regions-with-greatest-water-risks",
    "author": "GPSDD",
    "date": "July 2, 2018",
    "sourceCode": "https://github.com/GPSDD/DATA4SDGS-Highway-Examples/tree/master/app/scripts/components/OtherVisualization",
    "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "thumb": "/static/examples/regions-with-greatest-water-risks.png",
    "images": [
      "/static/examples/conflicts-related-to-protected-areas.png",
      "/static/examples/regions-with-greatest-water-risks.png"
    ]
  }
]
```

#### Security warning

The source code of this application makes no security or sanity checks on the content of the `html` field.
It's the sole responsibility of the editor of the examples file to validate that this HTML code is valid, does not introduce security
threats to the site or its users, and does not have any cross-interactions with other parts of the site, including other examples
using the `html` field. To minimize all these risks, its recommended to use a single `<iframe>` element in this field.
