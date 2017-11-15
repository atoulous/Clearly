const axios = require('axios');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const base = 'http://192.168.202.128/.hidden';
const regex = /<a href="(.+)">/;
const regex2 = /^[a-zA-Z0-9]{6,}/;

const recursiveSearch = async (url) => {
	if (url) {
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
					//console.log('URL1==', uri);
					const req2 = await axios.get(uri);
					const res = req2.data.toString();
					console.log('res==', res);
				} else if (e && e !== undefined && e !== '../') {
					//console.log('nurl==', e);
					await recursiveSearch(`${url}/${e}`);
				}
			});
		} catch (err) { throw err }
	}
}

recursiveSearch(base)
	.then()
	.catch((err) => console.log('err==', err));
