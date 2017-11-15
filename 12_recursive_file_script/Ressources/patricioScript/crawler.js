var request = require('request-promise');
var cheerio = require('cheerio');
var URL = require('url-parse');
Promise = require('bluebird')
var pages = []
var promises = []
var readmes = []
var pageToVisit = "http://10.11.200.171/.hidden/";

function links($) {
    var link = []
    var relativeLinks = $("a");
    relativeLinks.each(function() {
        if ($(this).attr('href') != '../') {
            link.push($(this).attr('href'))
        }
    });
    return link
}

function logReadme (page) {
    return new Promise(function () {
        console.log(page + "README")
        setTimeout(function () {
            request(page)
            .then(function (htmlString) {
                var $ = cheerio.load(htmlString);

                var linkss = links($)

                return Promise.each(linkss.map(function (link) {
                    if (link == "README") {
                        console.log(page + "README")
                    }
                    else {
                        var newPage = page + link
                        pages.push(newPage)
                        logReadme(newPage)
                    }
                })).then(allData => {
                });
                return false
            })
            .catch(function (err) {
            });

        }, 5000)
    }) 
}

logReadme(pageToVisit)
