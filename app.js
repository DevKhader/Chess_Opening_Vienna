const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Variation = require('./models/Variation');

mongoose.connect('mongodb+srv://testing:testing123@chess.ruf4ml3.mongodb.net/?retryWrites=true&w=majority&appName=Chess');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const variations = await Variation.find();
  res.render('index', { variations });
});

app.get('/variation/:id', async (req, res) => {
  const variation = await Variation.findById(req.params.id);
  res.render('variation', { variation });
});

app.post('/add', async (req, res) => {
  const { title, moves } = req.body;
  await Variation.create({ title, moves: moves.split(',').map(m => m.trim()) });
  res.redirect('/');
});

app.listen(3000, () => console.log('http://localhost:3000'));
