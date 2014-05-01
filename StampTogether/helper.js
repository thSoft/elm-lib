var elm = Elm.fullscreen(Elm.StampTogether, {
	stamped: {
		x: 0,
		y: 0
	}
});
elm.ports.url.subscribe(function(url) {
	var firebaseData = new Firebase(url);
	firebaseData.on('child_added', function(snapshot) {
		elm.ports.stamped.send(snapshot.val());
	});
});