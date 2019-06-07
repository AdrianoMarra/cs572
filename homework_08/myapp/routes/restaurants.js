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

  /**
   * 7. Write a MongoDB query to display the next 5 restaurants 
   * after skipping first 5 which are in the district Bronx.
   */
  // let results = await db.collection('restaurants')
  // .find({district:"Bronx"})
  // .skip(5)
  // .limit(5)
  // .toArray();
  // res.json(results);

  /** 
   * 12. Write a MongoDB query to find the restaurants which 
   * do not prepare any cuisine of 'American' and achieved a 
   * score more than 70 and located in the longitude less than -65.754168. 
   */
  // let results = await db.collection('restaurants')
  // .find({$and: [ 
  //   {"address.coord": {$elemMatch: {$lt: -65.754168}}}, 
  //   {"cuisine": {$ne: "American "}},
  //   {"grades": {$elemMatch: {"score": {$gt: 70}}}}
  // ]})
  // .limit(10)
  // .toArray();

  /** 
   * 14. Write a MongoDB query to find the restaurant Id, name, district and cuisine 
   * for those restaurants which contain 'Wil' as first three letters for its name. 
   */
  // let results = await db.collection('restaurants')
  // .find(
  //   {"name": {$regex: /^wil/, $options: "i"}},
  //   { projection: { restaurant_id:1, name:1, district:1, cuisine:1, _id:0 }})
  // .limit(10)
  // .toArray();

  /** 
   * 15. Write a MongoDB query to find the restaurant Id, name, district and cuisine 
   * for those restaurants which contain 'ces' as last three letters for its name. 
   */
  // let results = await db.collection('restaurants')
  // .find(
  // {"name": {$regex: "ces$", $options: "i"}},
  // { projection: { restaurant_id:1, name:1, district:1, cuisine:1, _id:0 }})
  // .limit(10)
  // .toArray();
  
  /**
   * 16. Write a MongoDB query to find the restaurant Id, name, district and cuisine 
   * for those restaurants which contain 'Reg' as three letters somewhere in its name.
   */
//   let results = await db.collection('restaurants')
//   .find(
//   {"name": {$regex: "Reg", $options: "i"}},
//   { projection: { restaurant_id:1, name:1, district:1, cuisine:1, _id:0 }})
//   .limit(10)
//   .toArray();

//   res.json(results);
// });

/**
 * 17. Write a MongoDB query to find the restaurants which belong to the district Bronx 
 * and prepared either American or Chinese dish.
 */
  // let results = await db.collection('restaurants')
  // .find({
  //   district: "Bronx",
  //   $or: [{"cuisine": "American "}, {"cuisine": "Chinese"}]},
  //   {projection: { restaurant_id:1, name:1, district:1, cuisine:1, _id:0 }})
  // .limit(10)
  // .toArray();

/**
 * 20. Write a MongoDB query to find the restaurant Id, name, district and cuisine 
 * for those restaurants which achieved a score which is not more than 10.
 */
  // let results = await db.collection('restaurants')
  // .find({
  //   // "grades.score": {$lte: 10}
  //   "grades.score": {$not: {$gt: 10}}
  //   },
  //   {projection: { restaurant_id:1, name:1, district:1, cuisine:1, grades:1, _id:0 }})
  // .limit(10)
  // .toArray();
  //   res.json(results);
  // });

/**
 * 21. Write a MongoDB query to find the restaurant Id, name, district and cuisine 
 * for those restaurants which prepared dish except 'American' and 'Chinees' or 
 * restaurant's name begins with letter 'Wil'.
 */
  let results = await db.collection('restaurants')
  .find(
    // {$or: [
    // // {"cuisine": {$nin: ["American ", "Chinese"]}},
    // {"name": {$regex: /^adriano/, $options: "i"}},
    // {"name": {$regex: /^marcu/, $options: "i"}}

    // ]},
    {$and: [
      // {"restaurant_id": "40361618"},
      {grades: { $elemMatch: { score: 10 } } }
    ]}

    // {projection: { restaurant_id:1, name:1, district:1, cuisine:1, _id:0 }}
    )
    .limit(10)
  .toArray();

  res.json(results);
});

router.post('/', async function (req, resp, next) {
  
  let results = await db.collection('restaurants')
  .insertOne(req.body);

  resp.json(results);
});

/**
 * CRUD RICH DOCUMENT LEVEL 01
 */

router.put('/:rest_id/grades', async function (req, resp, next) {
  let id = req.params.rest_id;

  let results = await db.collection('restaurants')
  .updateOne(
    {restaurant_id: id}, 
    {$push: {"grades": req.body}}
    );

  resp.json(results);
});

router.patch('/:rest_id/grades/:score', async function (req, resp, next) {
  let id = req.params.rest_id;
  let score = Number(req.params.score);

  let results = await db.collection('restaurants')
  .updateOne(
    {restaurant_id: id}, 
    {$set: {"grades.$[obj].grade": req.body.grade}},
    {arrayFilters: [{"obj.score": score}]}
    );

  resp.json(results);
});

router.delete('/:rest_id/grades/:score', async function (req, resp, next) {
  let id = req.params.rest_id;
  let score = Number(req.params.score);

  let results = await db.collection('restaurants')
  .updateOne(
    {restaurant_id: id}, 
    {$pull: {"grades": {"score": score} }}
    );

  resp.json(results);
});

/**
 * CRUD RICH DOCUMENT LEVEL 02
 */

router.put('/:rest_id/grades/:score/recipes', async function (req, resp, next) {
  
  let id = req.params.rest_id;
  let score = Number(req.params.score);

  let results = await db.collection('restaurants')
  .updateOne(
    {restaurant_id: id},
    {$push: {"grades.$[obj].recipes": req.body}},
    {arrayFilters: [{"obj.score": score}]}
    );

  resp.json(results);
});

router.patch('/grades/:score/recipes/:cheff', async function (req, resp, next) {
  
  let score = Number(req.params.score);
  let cheff = req.params.cheff;

  let results = await db.collection('restaurants')
  .update(
    {},
    {$set: {"grades.$[grade].recipes.$[recipe].name": "I did it..."}},
    {arrayFilters: [{"grade.score": score}, {"recipe.cheff": cheff}], multi: true}
  );

  resp.json(results);
});

router.delete('/grades/recipes/:cheff', async function (req, resp, next) {
  let cheff = req.params.cheff

  let results = await db.collection('restaurants')
  .updateOne(
    { "grades.recipes.cheff" : cheff.toString() }, 
    {$pull: { "grades.$.recipes": { "cheff": cheff.toString()}} }
    );


    console.log(cheff.toString());
  resp.json(results);
});

module.exports = router;
