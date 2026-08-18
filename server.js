require('dotenv').config()

const mongoose=require('mongoose')
const express=require('express')
const session=require('express-session')
const methodOverride=require('method-override')
const morgan=require('morgan')

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const usersController = require('./controllers/users.js');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',()=>{
  console.log(`connected to MongoDB ${mongoose.connection.name}.`)
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: false,
}))

app.use(passUserToView);

app.get('/', (req, res) => {
  res.render('index.ejs');
});
app.use('/auth', authController);

app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);
app.use('/users', usersController);


app.listen(process.env.PORT,()=>{
  console.log(`the express app is ready on port ${process.env.PORT} YAY!`)
})