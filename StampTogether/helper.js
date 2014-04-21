var firebaseData = new Firebase('https://thsoft.firebaseio-demo.com/thisiselmstamps');
var elm = Elm.fullscreen(Elm.StampTogether, {
	stamped: {
		x: 0,
		y: 0
	}
});
firebaseData.on('child_added', function(snapshot) {
	elm.ports.stamped.send(snapshot.val());
});
