
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GitHubStrategy = require('passport-github2').Strategy

//give by face book when creating an app an i wanted to keep it just incase it was needed
/*window.fbAsyncInit = function () {
    FB.init({
        appId: '{your-app-id}',
        cookie: true,
        xfbml: true,
        version: '{api-version}'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
}))

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
}))

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.GITHUB_CALLBACK_URL,
    passReqToCallback: true
},function (req, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
}))