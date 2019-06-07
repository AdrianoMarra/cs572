var express = require('express');
var router = express.Router();

/* GET list of all lectures. */
router.get('/', async function (req, res, next) {

  // //Find all WA zipCodes
  // let results = await db.collection('zips')
  // .aggregate([
  //   {$match: {state: "WA"}}
  // ])
  // .toArray();

    // //Find all zipCodes with population < 5000
    // let results = await db.collection('zips')
    // .aggregate([
    //   {$match: {pop:{$lt: 5000}}}
    // ])
    // .toArray();

    //Find all zipCodes with population < 5000
    // let results = await db.collection('zips')
    // .aggregate([
    //   {$group: { _id: {"city":"$city", "state": "$state"},
    //             "zip_codes": {$addToSet: "$_id"},
    //             "count": {$sum: 1}
    //           }}, 
    //   {$match: { "count": {$gt: 1}}},
    //   {$project: {"count": 0}},
    //   {$sort: {"_id.state": 1, "_id.city": 1}}
    // ])
    // .limit(10)
    // .toArray();

    //Find the smallest cities in each state
    let results = await db.collection('zips')
    .aggregate([
      {$group: {_id: {"city": "$city", "state": "$state"}, 
                population: {$sum: "$pop"}} },
      {$sort: {"_id.state": 1, "population": 1}},
      {$group: {_id: "$_id.state", city: {$first: "$_id.city"}, pop: {$first: "$population"} }},
      {$sort: {"_id": 1}}
    ])
    .toArray();

  res.json(results);
});

module.exports = router;
