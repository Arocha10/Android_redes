angular.module('starter.services', [])

.factory('Usuario', function() {
  // Might use a resource here that returns a JSON array
  var usuario_actual = {};

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
        usuario= db.ref('/Cuentas/'+uid);
        console.log("hay user");        
        usuario.on('value', function(snapshot) {
          usuario_actual.nombre = snapshot.val().nombre;
          usuario_actual.apellido = snapshot.val().apellido;
          usuario_actual.total = snapshot.val().total;
          usuario_actual.email = email;
          usuario_actual.uid = uid;
        });
        
      } else {
        console.log("no user");        
        usuario_actual.nombre =null;
        usuario_actual.apellido = null;
        usuario_actual.total = null;
        usuario_actual.email = null;
        usuario_actual.uid = null; 
      }

      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
      })
  // Some fake testing data

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
