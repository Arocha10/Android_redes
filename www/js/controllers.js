angular.module('starter.controllers', [])

.controller('UpCtrl', function($scope, $location){
  function createUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email.length < 4) {
      alert('Por favor ingrese una direccion valida ' + email.length);
      return;
    }
    if (password.length < 4) {
      alert('Por favor ingrese la contraseña');
      return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    var cuentas= db.ref('/Cuentas');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('La contraseña no es segura.');
      } else {
        alert(errorMessage);
      };
      alert(error);
      // [END_EXCLUDE]
    })
    .then(function(newUser){
      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      cuentas.child(newUser.uid).set({nombre : nombre, apellido : apellido, total:5000, email:email})
    });
    alert("Te has registrado correctamente");
    $location.path('/tab/dash');
    // [END createwithemail]
  };
  document.getElementById('quickstart-sign-up').addEventListener('click', createUser, false);
})

.controller('IniCtrl', function($scope, $location){   
  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END authwithemail]
      $location.path('/tab/dash');
    }
  };

  function initApp(){
    // Listening for auth state changes.
    // [START authstatelistener]
    
  }

  $scope.signUp = function(){
    $location.path('/signUp');
  }

  initApp();
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

})

.controller('DashCtrl', function($scope, $location, Usuario) {
  $scope.usuario = Usuario.usuario();
  $scope.usuarios = [];
  console.log($scope.usuario);

  if ($scope.usuario === null){
    $location.path('/ini');
  };

  db.ref('/Cuentas').on('value', function(data){
    for (var key in data.val()) {
      if (data.val()[key].email != Usuario.usuario().email){
        $scope.usuarios.push(data.val()[key].email)
      }
    }
  }); 

  console.log($scope.usuarios);

  function transfer() {
    var user_id = {};
    var email = document.getElementById('email').value;
    console.log("email obtenido " + email);
    var monto = document.getElementById('monto').value;
    var descripcion = document.getElementById('descripcion').value;
    
    db.ref('/Cuentas').on("child_added", function(snapshot) {
      if (snapshot.val().email === email){
        db.ref('/Transferencias').push({usr_origen: $scope.usuario.uid,
                                               usr_destino: snapshot.key,
                                               monto : monto,
                                               descripcion: descripcion,
                                               status: 'pendiente'});
        user_id.listo=true;
      }  
      
    });
    console.log(user_id.listo);
  };

  document.getElementById('transfer').addEventListener('click', transfer, false);
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
