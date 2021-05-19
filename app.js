require("dotenv").config();
const passportFunctions = require("./passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
// const expressSession = require("express-session");

const handlebars = require("express-handlebars");

// authenticate requests
const app = express();
const knexConfig = require("./knexfile")["development"];
const knex = require("knex")(knexConfig);
const BugService = require("./database/bugService");
const BugRoutes = require("./routes/bugRoutes");

let bugService = new BugService(knex);
let bugRouter = new BugRoutes(bugService);

app.use(express.static("public"));
app.use(cookieParser());
app.engine("handlebars", handlebars());

app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(
//   // Creating a new session generates a new session id, stores that in a session cookie, and
//   expressSession({
//     secret: "secret",
//     // save the user
//     // if false, will not save session to browser
//     resave: true,
//     // if saveUninitialized is false, session object will not be stored in sesion store
//     saveUninitialized: true,
//   })
// );

app.use(passportFunctions.initialize());
//
app.use(passportFunctions.session());
// middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("User is totally authenticated");
    return next();
  }

  res.redirect("/login");
}

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post(
  "/signup",
  passportFunctions.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/error",
  })
);

app.post(
  "/login",
  passportFunctions.authenticate("local-login", {
    successRedirect: "/debug",
    failureRedirect: "/error",
  })
);

app.get(
  "/auth/gmail",
  passportFunctions.authenticate("google", {
    // want to get this so you can save information to your database
    // can save it into your database
    scope: ["profile", "email"],
  })
);
app.get(
  "/auth/gmail/callback",
  passportFunctions.authenticate("google", {
    successRedirect: "/debug",
    failureRedirect: "/error",
  })
);

app.get(
  "/auth/facebook",
  passportFunctions.authenticate("facebook", {
    scope: ["email"],
  })
  // #TODO: email
);

// After user authenticates, redirect to /
app.get(
  "/auth/facebook/callback",
  function (request, response) {
    passportFunctions.authenticate(
      "facebook",
      function (error, user, info) {
        if (error) {
          console.log("error");
        }
        if (!user) {
          response.redirect("/login");
        }
        console.log(
          "Facebook login successful. User:",
          user
        );
        console.log("Information", info);
        // response.render("debug", {});
        response.send(user);
      }
    );
  }
);

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/debug", (request, response) => {
  response.render("debug");
});

// app.get("/debug", passport.authenticate(""))

app.get("/error", (request, response) => {
  response.render("error");
});

app.use("/", bugRouter.router());

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
