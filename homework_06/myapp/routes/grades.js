var express = require('express');
var router = express.Router();
var validateJson = require('./../myMiddleware');

var grades = [{ name:"Assad Saad", course:"CS572", grade:95, id: 1 },
{ name:"Paul Corazza", course:"CS571", grade:95, id: 2 },
{ name:"Joseph Lerman", course:"CS573", grade:95, id: 3 }];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(grades);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  var resp = grades.filter((item)=>item.id == id);
  res.json(resp);
});

router.post('/', validateJson, function(req, res, next) {
  let newId = grades.length + 1;
  req.body.id = newId;
  grades.push(req.body);
  res.json({status: 200, ok: true, data: grades})
});

router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  let indexToDel = grades.findIndex(item => item.id == id)
  
  if (indexToDel != -1) {
    let deleted = grades.splice(indexToDel, 1);
    res.json({status: 200, ok: true, data: deleted})
  } else {
    res.json({status: 404, ok: false, error: "Id not found"})
  }
});

module.exports = router;
