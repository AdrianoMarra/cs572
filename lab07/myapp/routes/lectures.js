var express = require('express');
var router = express.Router();
var validateJson = require('../myMiddleware');

var grades = [{ name:"Assad Saad", course:"CS572", grade:95, id: 1 },
{ name:"Paul Corazza", course:"CS571", grade:95, id: 2 },
{ name:"Joseph Lerman", course:"CS573", grade:95, id: 3 }];

/* GET list of all lectures. */
router.get('/', function(req, res, next) {
  db.collection('lectures').find().toArray().then((e) => {
    res.json(e);
  })
});

/* GET a particular lecture. */
router.get('/:lecture', function(req, res, next) {
  const query = {"lecture": req.params.lecture};
  db.collection('lectures').findOne(query, {projection: {}}).then((e) => {
    res.json(e);
  })
});

/* POST a new lecture. */
router.post('/', function(req, res, next) {
  db.collection('lectures').insertMany(req.body, (error, inserted) => {
    res.json(inserted);
  });
});

/* Delete a lecture. */
router.delete('/:lecture', function(req, res, next) {
  const query = {"lecture": req.params.lecture};
  db.collection('lectures').deleteOne(query, (error, deleted) => {
    res.json(deleted);
  });
});

router.get('/search/:q', function(req, res, next) {
  const query = {"lecture": { $regex: req.params.q , $options: "i"} };
  db.collection('lectures').find(query).toArray().then((e) => {
    res.json(e);
  })
});

module.exports = router;
