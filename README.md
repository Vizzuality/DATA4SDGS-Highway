# DATA4SDGS Highway

> Connected open data for sustainable development purposes.

## Installation

Requirements:

* NodeJs 6.0+ [How to install](https://nodejs.org/download/)

Install dependencies:

```
npm install
```

## Usage

Create a new file `.env` based on the `.env.sample` file and insert your credentials.

``` bash

# serve with hot reload at 127.0.0.1:3000
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

## .env variables
* API_BASE_URL - Map layers + datasets api base url.
* TWITTER_CONSUMER_KEY - twitter consumer key (needed for tweets slider).
* TWITTER_CONSUMER_SECRET - twitter consumer secret (needed for tweets slider).
* TWITTER_ACCESS_TOKEN_KEY - twitter access token key (needed for tweets slider).
* TWITTER_ACCESS_TOKEN_SECRET - twitter access token secret (needed for tweets slider).
* GOOGLE_ANALYTICS - google analytics app id
* SHOW_FEEDBACK - flag to activate the landing's page feedback form

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
