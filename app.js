var express			= require('express'),
	app				= express(),
	http			= require('http').Server(app),
	io				= require('socket.io')(http),
	config			= require('./config/config'),
	twit			= require('twit'),
	Autolinker		= require( 'autolinker' );

var tweetArray = new Array();
var tweet = new twit(config.twitter);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	socket.on('track hashtag', function(msg){
		tweetArray[msg] = new streamHandler(tweet.stream('statuses/filter', {track : msg}));
	});
	socket.on('untrack hashtag', function(msg){
		tweetArray[msg].stop();
		delete tweetArray[msg];
	});
	socket.on('app init', function(msg){
		if (Object.keys(tweetArray).length > 0){
			for (var property in tweetArray) {
				if (tweetArray.hasOwnProperty(property)) {
					socket.emit('tracking hashtag',property);
				}
			}
		}
	});
});

http.listen(config.server.port, function(){
	console.log('Listening on *:'+config.server.port);
});

function streamHandler(stream){
	this.stream = stream;
	this.stream.on('tweet', function (tweet) {
		var newTweet = {
			text			: Autolinker.link(tweet['text'],{ newWindow : true , hashtag : 'twitter' }),
			datetime		: tweet['created_at'],
			profileimage	: tweet['user']['profile_image_url'],
			username		: tweet['user']['screen_name']
		};
		io.emit('new tweet', newTweet);
	});
	this.stream.on('error', function (eventMsg) {
		console.log(eventMsg);
	});
	this.stop = function (){
		this.stream.stop();
	}
}