// PACKAGES
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const bcrypt = require('bcrypt-nodejs');

// MODELS
const User = require('../models/user.model');

// TODO: get Facebook & Twitter API ClientID

// Facebook authentication
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: '/auth/callback/facebook',
//     profileFields: ['id', 'displayName', 'email']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ facebookId: profile.id });
//       if (!user) {
//         user = new User({
//           name: profile.displayName,
//           email: profile.emails ? profile.emails[0].value : null,
//           facebookId: profile.id,
//         });
//         await user.save();
//       } else {
//         user.facebookId = profile.id;
//         await user.save();
//       }
//       const token = await user.createAccessToken();
//       return done(null, { user, token });
//     } catch (err) {
//       return done(err);
//     }
// }));

// Google authentication
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/callback/s=google',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email:  profile.emails[0].value });
    
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      user = new User({
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails ? profile.emails[0].value : null,
        password: salt,
        profilePicture: profile.photos[0].value,
        googleId: profile.id,
      });
      await user.save();
    } else if(!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }

    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();

    const token = {
      refreshToken,
      accessToken,
    }

    return done(null, user, token);
  } catch (err) {
    return done(err);
  }
}));

  
// Twitter authentication
// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: '/auth/callback/twitter',
//   }, async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ twitterId: profile.id });
//       if (!user) {
//         user = new User({
//           name: profile.displayName,
//           twitterId: profile.id,
//         });
//         await user.save();
//       } else {
//         user.twitterId = profile.id;
//         await user.save();
//       }
//       const token = await user.createAccessToken();
//       return done(null, { user, token });
//     } catch (err) {
//       return done(err);
//     }
// }));

passport.serializeUser(function(user, done) {
  // serialize the user object
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(data, done) {
  // deserialize the user object
  done(null, JSON.parse(data));
});


module.exports = passport;