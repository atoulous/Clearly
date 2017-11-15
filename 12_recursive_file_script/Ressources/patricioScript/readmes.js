fs = require('fs')
Promise = require('bluebird')
var request = require('request-promise');
fs.readFile('toto', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	var spliit = data.split("\n").filter(function (path) {
	// console.log(path[path.length - 1])
	return path[path.length - 1] == "E"
})
	var links = spliit.filter(a => {
		return a.split("/").length == 8
	})

var interval = 0.01 * 1000; // 10 seconds;
links = links.reverse()
for (var i = 0; i <=links.length-1; i++) {
	setTimeout( function (i) {
		request(links[i]).then(asdf => {
			// console.log(i)
			if (asdf.split(" ")[0] == "Tu" || asdf.split(" ")[0] == "Toujours" || asdf.split(" ")[0] == "Demande" || asdf.split(" ")[0] == "Non") {
				// console.log(asdf.split(" ")[0])
				return (asdf.split(" ")[0])
			}
			else {
				console.log(links[i])
				console.log(asdf)
			}
		})
		.catch(err => {
			//console.log("ERROR-----------")
	//		console.log(links[i])
		})
	}, interval * i, i);
}
// Promise.each(links.map(function (asdf) {
// 	return request(asdf).then(asdf => {
// 		if (asdf.split(" ")[0] != "Tu" && asdf.split(" ")[0] != "Toujours" && asdf.split(" ")[0] != "Demande" && asdf.split(" ")[0] != "Non") {
// 			console.log(asdf.split(" ")[0])
// 			return (asdf.split(" ")[0])
// 		}
// 	}).catch(err => {
// 		console.log(err)
// 	})
// })).then(allData => {
// 	console.log("allData")
// 	console.log(allData)
// })
// .catch(err => {
// 	console.log("asdf")
// 	console.log(err)
// })
});
