function openNav() {
    $("#side_nav").toggleClass("open_nav");
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}
var auth2=null;

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    auth2 = gapi.auth2.init();
    if (isUserLoggedIn()) {
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        $('.circle').attr('src', profile.getImageUrl());
        $('.circle').show();

    }
    displayLogginState();
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
function signOut() {
    auth2.signOut().then(function () {
        console.log('User signed out.')
    });
    $('#sign_out').hide();
    $('#my-signin2').show();
    $('.circle').hide();
}
function isUserLoggedIn(){
    if(auth2){
        return auth2.isSignedIn.get()!=false;
    }
    return false;
}
function displayLogginState(){
    if (isUserLoggedIn()) {
        $('#sign_out').show();
        $('.circle').show();
        $('#my-signin2').hide();
    } else {
        $('#sign_out').hide();
        $('.circle').hide();
        $('#my-signin2').show();
    }
}

function checkImageSize(selector){
    $(selector).each(function() {
        var height = this.naturalHeight;
        var width = this.naturalWidth;
        if (width==120 && height == 90){
            $(this).attr("src","images/noimage.png");
        }
    });
}

$(document).ready(function() {
    $('#sign_out').click(signOut);
    $('#sign_out').hide();
    if(isUserLoggedIn() === true){
        $('#sign_out').show();
    }else{
        renderButton();
    }

    $('.tooltipped').click(openNav);
});