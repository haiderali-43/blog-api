import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";

const passportConfig = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" }, // Specify email as the username field
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email }); // Find the user by email
          if (!user) {
            return done(null, false, { message: "Incorrect email." }); // User not found
          }

          const isMatch = await bcryptjs.compare(password, user.password); // Compare passwords
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." }); // Password mismatch
          }

          return done(null, user); // Success, return the user
        } catch (err) {
          return done(err); // Handle errors
        }
      }
    )
  );

  // Serialize the user ID to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user from the session using the ID
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default passportConfig;
