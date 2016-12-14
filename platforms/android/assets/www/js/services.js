angular.module('starter.services', [])

.factory('Usuario', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var usuario_actual ={};

  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    //document.getElementById('quickstart-verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE silent]
      var usuario= db.ref('/Cuentas/'+uid);
      usuario.on('value', function(snapshot) {
        usuario_actual.nombre = snapshot.val().nombre;
        usuario_actual.total = snapshot.val().total;
        usuario_actual.apellido = snapshot.val().apellido;
      })
    } else {
      usuario_actual.nombre = null;
      usuario_actual.apellido = null;
      usuario_actual.total = 0;
      $location.path('/');
    }
    // [START_EXCLUDE silent]
    // [END_EXCLUDE]
  })

  return {
    usuario: function() {
      return usuario_actual;
    },
    remove: function(chat) {
      //chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      //for (var i = 0; i < chats.length; i++) {
      //  if (chats[i].id === parseInt(chatId)) {
      //    return chats[i];
      //  }
      //}
      //return null;
    }
  };
});
