var firebaseData = new Firebase('https://thsoft.firebaseio-demo.com/stamps');
var elm = Elm.fullscreen(Elm.StampTogether.Main);
firebaseData.on('child_added', function(snapshot) {
	elm.send('stamped', snapshot.val());
});