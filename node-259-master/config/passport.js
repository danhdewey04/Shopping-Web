  require("dotenv").config();
  const passport = require("passport")
  const GoogleStrategy = require("passport-google-oauth20").Strategy;
  const FacebookStrategy = require("passport-facebook").Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
    // ❌ Không lưu vào DB nữa
    const tempUser = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    };
    return done(null, tempUser);
  }

    
  ));

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: "http://localhost:8080/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"] // Lấy thêm email và avatar
    },
    async (accessToken, refreshToken, profile, done) => {
      // ❌ Không lưu DB, chỉ trả về thông tin user
      const tempUser = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || "",
        avatar: profile.photos?.[0]?.value || ""
      };
      return done(null, tempUser);
    }
  )
);

  passport.serializeUser((user, done) => {
    done(null, user); // Lưu user id vào session
  });

  passport.deserializeUser((user, done) => {
    done(null, user); // Lấy lại user tạm từ session
  });