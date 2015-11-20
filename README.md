# node-twitter-streamer
A real-time twitter streaming webapp using Node.js and Socket.io

## Prerequisites
- node.js
- npm
- bower
- git

## Installation
Clone this repository and install node and bower dependencies
```sh
$ git clone git@github.com:ivanmarban/node-twitter-streamer.git
$ cd node-twitter-streamer
$ npm install
$ bower install
```
Modify config/config.js with your Twitter application keys

```javascript
module.exports = {
	twitter : {
		consumer_key: 			'TWITTER_CONSUMER_KEY',
		consumer_secret:		'TWITTER_CONSUMER_SECRET',
		access_token:			'TWITTER_ACCESS_TOKEN_KEY',
		access_token_secret:	'TWITTER_ACCESS_TOKEN_SECRET'
	},
	server : {
		port: 8080
	}
}
```

Start the app and launch it on http://localhost:8080
```sh
$ node app.js
```