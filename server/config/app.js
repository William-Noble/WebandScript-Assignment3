let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
// very important line below !!!
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

let app = express();
let cors = require('cors');

// create routers for each page
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let assignmentRouter = require('../routes/assignment');


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// getting-started.js
let mongoose = require('mongoose');
let DB = require('./db');
// point mongoose to the DB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log("Connected with the MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})

// create session
app.use(session({
	secret:"SomeSecret",
	saveUninitialized: false,
	resave: false
}))


let userModel = require('../model/user');
let User = userModel.User;

//implement a User Authentication
passport.use(User.createStrategy());

// serialize/deserialize user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//initialize the flash
app.use(flash());

/* main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AssignmentLib');
  //await mongoose.connect('mongodb+srv://ahmedsheikh:Test123@cluster0.0f3pz.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


let jwtoptions = {};
jwtoptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtoptions.secretOrKey = DB.secret;

// use routers when correct address is typed into url
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignmentslist',assignmentRouter);
// /project --> projectrouter
// /contactus --> contactus

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});
let Strategy = new JWTStrategy(jwtoptions,(jwt_payload,done)=>{
  User.findById(jwt_payload.id, (err, user) => {
   if (err) return done(err, false);
   return done(null, user);
  });
});

passport.use(Strategy);
module.exports = app;
