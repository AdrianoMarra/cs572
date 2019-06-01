var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    // var date = new Date(); 
    // date.setDate(date.getDate() - 1);
    // res.append('Last-Modified', (date).toUTCString());
    res.setHeader('Cache-Control', 'public, max-age=86400000');
    res.send('case sensitive works!!');
});

module.exports = router;
