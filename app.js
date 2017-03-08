(function(){
  var config = {
    apiKey: "AIzaSyDHQ1wGhiNYdzBHIdb_mzMXfnyp0GdGnR8",
    authDomain: "breaking-vad-online-simulation.firebaseapp.com",
    databaseURL: "https://breaking-vad-online-simulation.firebaseio.com",
    storageBucket: "breaking-vad-online-simulation.appspot.com",
  };
  firebase.initializeApp(config);

  const txtEmail = document.querySelectorAll("#txtEmail")[0];
  const txtPassword = document.querySelectorAll("#txtPassword")[0];
  const btnLogin = document.querySelectorAll("#btnLogin")[0];
  const btnSignUp = document.querySelectorAll("#btnSignUp")[0];
  var users = firebase.database().ref("Users");
  //const btnLogout = document.getElementById('btnLogout');

  btnLogin.addEventListener('click', e =>{
    console.log(txtEmail.value)
    //alert(txtPassword.value)
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));

  });

  btnSignUp.addEventListener('click', e =>{
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    // auth.createUserWithEmailAndPassword(email, password).then(user =>{
    //   const promise = user.sendEmailVerification();
    //   promise.catch(e => alert(e.message));
    // }, error =>{
    //   alert(error.message);
    // });

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));

  });

  //btnLogout.addEventListener('click', e =>{
    //firebase.auth().signOut();
  //});
  const forgotPW = document.querySelectorAll("#forgotPW")[0];
  forgotPW.addEventListener('click', e =>{
    const email = txtEmail.value;
    if(!email) {
        alert('Please enter Email Address and re-click "Forgot password?" to get password recovery email.')
      }
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
         alert('A password reset email has been sent to your email address.')
      }, function(error) {
        if(error.code == "auth/invalid-email") {
          alert('Please enter your Email Address and re-click "Forgot password?" to get password recovery email.');
        } else {
          alert(error.message);
        }
      });
  });
  // function forgotPW(emailAddress) {
  //   if(!email) {
  //     alert('Please enter Email Address and re-click "Forgot password?" to get password recovery email.')
  //   }
  //   var auth = firebase.auth();
  //   auth.sendPasswordResetEmail(emailAddress).then(function() {
  //      alert('A password reset email has been sent to your email address.')
  //   }, function(error) {
  //     if(error.code == "auth/invalid-email") {
  //       alert('Please enter your Email Address and re-click "Forgot password?" to get password recovery email.');
  //     } else {
  //       alert(error.message);
  //     }
  //   });
  // }


  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser.emailVerified){
      if(firebaseUser){
        console.log(firebaseUser);
        var userID =  firebaseUser.uid;
        var userEmail = firebaseUser.email;
        users.set({
          UserID: userID
        });
        var usersMap = firebase.database().ref("Users Map/" + userID);
        usersMap.set({
          email: firebaseUser.email
        });
        localStorage.setItem('userid', userID);
        window.location = 'PresetPage';
      }else{
        console.log("Not Logged In");
      }
    }
    else{
      if(firebaseUser){
        firebaseUser.sendEmailVerification().then(function(){
          alert("A verification email has been sent to you, please verify prior to logging in.");
        },function(error){
          alert(error.message);
        })
      }
    }
  });

}());
