const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

/* GET qoutes id */
/* router.get('/:id', async function(req, res, next) {
  quote_id = req.params.id;
  try {
    res.json(await quotes.getID(req.query.quote_id));
  } catch (err) {
    console.error(`Error while getting id `, err.message);
    next(err);
  }
}); */
router.get('/:id', async function(req, res, next) { // http://localhost:3000/quotes/34 
  let quote_id = req.params.id;
  //id = req.params.id;
  console.log(req.params)
  try {
    res.json(await quotes.getID(Number(quote_id)));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});
//app.get('/quote/:id', function (req, res) {
  
/* Update quotes */

router.put('/:id', async function(req, res, next) { // http://localhost:3000/quotes/34 
  let quote_id = req.params.id;
  let { quote, author } = req.body;
  console.log(quote, author)
  try {
    res.json(await quotes.getUpdate({ quote, author } , quote_id ))
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});


/* Delete quotes */
router.delete('/:id', async function(req, res, next) { // http://localhost:3000/quotes/34 
  let quote_id = req.params.id;
  //let { quote, author } = req.body;
  console.log(quote_id)
  try {
    res.json(await quotes.getRemove(quote_id ))
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});



/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    next(err);
  }
});

module.exports = router;