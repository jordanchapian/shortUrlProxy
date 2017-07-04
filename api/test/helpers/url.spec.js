var urlUtils = require('../../helpers/url.js');

describe("URL Utilities", function(){

    it("should correctly classify valid URLs", function(next){
        var validURLs = [
            "http://www.foufos.gr",
            "https://www.foufos.gr",
            "http://foufos.gr",
            "http://www.foufos.gr/kino",
            "http://www.t.co",
            "http://t.co",
            "http://werer.gr"
        ];

        validURLs.forEach(function(url){
            expect(urlUtils.urlIsValid(url)).toBe(true);
        });

        next();
    });

    it("should correctly classify invalid URLs", function(next){
        //will not match these cases
        var invalidURLs = [
            "www.foufos.gr",
            "www.mp3.com",
            "www.t.co",
            "www.foufos",
            "www.mp3#.com",
            "www.foufos-.gr",
            "www.-foufos.gr"
        ];


        invalidURLs.forEach(function(url){
            expect(urlUtils.urlIsValid(url)).toBe(false);
        });

        next();
    });
});