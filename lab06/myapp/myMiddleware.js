function validateJson(req, res, next) {
    
    if(typeof req.body =='object') {
        if(req.body.name != undefined && req.body.name != "")
            if (req.body.course != undefined && req.body.course != "") 
                if (req.body.grade != undefined && req.body.grade != "") 
                    return next();
    }
    
    return res.json({status: 400, error: "it is not a valid Json input"});
}

module.exports = validateJson;