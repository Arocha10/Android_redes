angular.module('starter.services', [])

.factory('Usuario', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data

  return {
    usuario: function() {
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
        uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE silent]
        usuario_actual= db.ref('/Cuentas/'+uid);
        return usuario_actual.once('value').then(function(snapshot) {
          return snapshot.val()
        });
        
      } else {
        return null;
      }

      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
      })      
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
