const express = require('express');
var router = express.Router();

const LinkMap = require('../../models/LinkMap.js');
const KnownPhishingUrl = require('../../models/KnownPhishingUrl.js');


router.get('/:linkId/redirect', function (req, res) {
    LinkMap.findOne({ _id: req.params.linkId }, function(err, map) {
        if(map === null){
            return res.status(404).send("");//error page?
        }

        res.redirect(map.targetURL);
    });
});

router.post('/', function (req, res) {

    //require this param
    if(req.body.targetUrl === undefined){
        return res.status(422).send();
    }

    //determine if this is a known phishing url
    KnownPhishingUrl.findOne({url:req.body.targetUrl}, function(err, result){

        if(result !== null){
            return res.status(422).send();
        }

        LinkMap.findOne({ targetURL: req.body.targetUrl }, function(err, map) {

            if(map !== null){
                return res.send(map);
            }

            LinkMap.create({
                targetURL:req.body.targetUrl
            })
                .then(function(e){
                    res.send(e);
                }, function(err){
                    console.log(err);
                });

        });
    });

});

module.exports = router;