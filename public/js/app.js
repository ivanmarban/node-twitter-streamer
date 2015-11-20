var socket = io();

$('#track').submit(function(e) {
	e.preventDefault();
	var hashtag = $('#hashtag').val().replace('#', '');
	if (hashtag != '') {
		socket.emit('track hashtag', hashtag);
		$('#hashtag').val('');
		addHashtag(hashtag);
	}
	return false;
});

socket.on('new tweet', function(tweet) {
	var div = '<div class="media"><div class="media-left">' +
		'<img class="media-object img-rounded" src="' + tweet['profileimage'] + '">' +
		'</div><div class="media-body"><h4 class="media-heading">' + tweet['username'] +
		'</h4>' + tweet['text'] + '</div></div>';
	$('<div class="well well-sm"></div>').html(div)
		.prependTo('#tweets')
		.css({
			opacity : 0
		}).slideDown('slow').animate({
			opacity : 1
		}, 'slow');
});

socket.on('tracking hashtag', function(hashtag) {
	addHashtag(hashtag);
});

$('#tracking-hashtags').delegate('a', 'click', function() {
	socket.emit('untrack hashtag', $(this).attr('id'));
});

socket.emit('app init');

function addHashtag(hashtag){
	var link = '<a class="close" data-dismiss="alert" id="' + hashtag + '" href="#">&times;</a><p>&num;' + hashtag + '</p>';
	$('<div class="alert alert-info" id="' + hashtag + '"></div>').html(link)
		.prependTo('#tracked-hashtags')
		.css({
			opacity : 0
		}).slideDown('slow').animate({
			opacity : 1
		}, 'slow');
}