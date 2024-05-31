const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const contactRouter = require('./public/javascripts/contact');
const loginRoutes = require('./public/javascripts/login');
const reviewRoutes = require('./public/javascripts/reviews');
const registerRoutes = require('./public/javascripts/register');
const forgotRoutes = require('./public/javascripts/forgot'); 
const orderRoutes = require('./public/javascripts/orders');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb+srv://madhav:M@dhavdon1@truneed.eej7fda.mongodb.net/?retryWrites=true&w=majority&appName=truneed');
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Truneeds' })
}));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'home.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'home.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'shop.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'cart.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'Login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'register.html'));
});

app.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'forgot.html'));
});
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});
app.get('/get-username', (req, res) => {
  if (req.session.user && req.session.user.name) {
      res.json({ username: req.session.user.name });
  } else {
      res.json({ username: null });
  }
});

app.use('/contact', contactRouter);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/forgot", forgotRoutes);
app.use('/reviews', reviewRoutes);
app.use("/submit-review", reviewRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
