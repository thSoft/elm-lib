var firebaseData = new Firebase('https://samplechat.firebaseio-demo.com/message_list');
var elm = Elm.fullscreen(Elm.Chat);
firebaseData.on('child_added', function(snapshot) {
	elm.send('messageArrived', snapshot.val());
});