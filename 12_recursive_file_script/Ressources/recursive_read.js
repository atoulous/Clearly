const axios = require('axios');
const _ = require('lodash');

const base = 'http://10.11.200.171/.hidden/whtccjokayshttvxycsvykxcfm/';
const regex = /<a href="(.+)">/;
const regex2 = /^[a-zA-Z0-9]{6,}/;
const regex3 = /^[a-zA-Z0-9]{20,}/;

const recursiveSearch = async (url) => {
	try {
		const req = await axios.get(url);
		const array = req.data.split(regex);
		let list = _.map(array, (e) => {
			if (e) {
				const match = e.match(regex2);
				if (match && match.length) return match[0];
			}
		});
		list = _.uniqBy(list, (e) => e);
		_.map(list, async (e) => {
			if (e === 'README') {
				uri = `${url}/${e}`;
				const req2 = await axios.get(uri);
				const res = req2.data.toString();
				if (res.match(regex3)) {
					console.log('flag is', res);
					process.exit();
				}
			} else if (e && e !== undefined && e !== '../') {
				await recursiveSearch(`${url}/${e}`);
			}
		});
	} catch (err) { throw err }
}

recursiveSearch(base)
	.then(() => console.log('Script running'))
	.catch((err) => console.log('err==', err));
