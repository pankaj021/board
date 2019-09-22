const shortid = require('shortid');

module.exports.randomIdGenerator = () => (shortid.generate() + Math.ceil(100000000 * Math.random()));
