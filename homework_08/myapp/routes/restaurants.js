var express = require('express');
var router = express.Router();

/* GET list of all lectures. */
router.get('/', async function (req, res, next) {

  //Fields: restaurant_id, name, district and cuisine
  // let results = await db.collection('restaurants')
  // .find({},{ projection: { restaurant_id:1, name:1, district:1, cuisine:1 }})
  // .toArray();
  // res.json(results);

  //Fields: restaurant_id, name, district and cuisine but excluding _id
    // let results = await db.collection('restaurants')
    // .find({},{ projection: { restaurant_id:1, name:1, district:1, cuisine:1, _id:0 }})
    // .toArray();
    // res.json(results);

  //Fields: Display all restaurants in the district Bronx
    // let results = await db.collection('restaurants')
    // .find({district:"Bronx"})
    // .toArray();
    // res.json(results);

  //Fields: Display all restaurants in the district Bronx
    // let results = await db.collection('restaurants')
    // .find({district:"Bronx"})
    // .toArray();
    // res.json(results);

  //Fields: Display next 5 restaurants in the district Bronx after skiping the first 5
  // let results = await db.collection('restaurants')
  // .find({district:"Bronx"})
  // .skip(5)
  // .limit(5)
  // .toArray();
  // res.json(results);

  //Fields: Display restaurants that locates in coord value less than -95.754168
  // let results = await db.collection('restaurants')
  // .find({"address.coord": {$elemMatch: {$lt: -95.754168}}})
  // .toArray();
  // res.json(results);

  //Fields: Display restaurants that locates in coord value less than -65.754168, 
  //does not prepare American cuisine and has a grade score greater than 70
  let results = await db.collection('restaurants')
  .find({$and: [ 
    {"address.coord": {$elemMatch: {$lt: -65.754168}}}, 
    {"cuisine": {$ne: "American "}},
    {"grades": {$elemMatch: {"score": {$gt: 70}}}}
  ]})
  .limit(10)
  .toArray();
  res.json(results);
});


module.exports = router;
