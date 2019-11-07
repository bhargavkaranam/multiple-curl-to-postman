const curlToPostman = require('curl-to-postmanv2'),
  Collection = require('postman-collection').Collection;

module.exports = {
  convertToCollection: async function (curlRequests, cb) {
    if (!curlRequests) {
      console.log('No curl requests supplied!');
    
      process.exit(1);
    }

    let collection = new Collection();
    
    Promise.all(curlRequests.map((curl) => {
      return new Promise((resolve, reject) => {
        curlToPostman.convert({ type: 'string', data: curl }, (err, result) => {
          if (err) {
            return reject(err);
          }
    
          collection.items.add({ name: result.output[0] && result.output[0].data.name, request: result.output[0] && result.output[0].data });
    
          return resolve();
        });
      });
    }))
      .then(() => {
        return cb(null, collection);
      })
      .catch(cb);
  }
}



