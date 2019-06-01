var express = require('express');
var router = express.Router();
const { from } = require('rxjs');
const { shareReplay } = require('rxjs/operators');
const axios = require('axios');

/* GET users listing. */
router.get('/', function (req, res, next) {
  obs$ = from(axios.get(`https://randomuser.me/api/?page=${req.query.page}&results=10`)).pipe(shareReplay(1))
  obs$.subscribe(resp => {
    const page = Number(req.query.page);
    res.links({
      prev: `http://localhost:3000/users/?page=${page - 1}`,
      next: `http://localhost:3000/users/?page=${page + 1}`,
      last: `http://localhost:3000/users/?page=${10000}`
    })

    // var date = new Date(); 
    // date.setDate(date.getDate() - 1);
    // res.append('Last-Modified', (date).toUTCString());

    res.setHeader('Cache-Control', 'public, max-age=86400000');
    res.send(resp.data);
  });
});

module.exports = router;
