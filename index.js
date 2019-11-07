const yargs = require('yargs'),
  { convertToCollection } = require('./src/convert'),
  curlRequests = yargs.array('curl').argv.curl || [], // If you don't want to pass the requests as arguments, you can add them in the array here
  fs = require('fs');

convertToCollection(curlRequests, (err, collection) => {
  if (err) {
    console.log('Error occurred', err);

    process.exit(1);
  }

  let postmanCollection = collection.toJSON();

  fs.writeFile('Postman-Collection.json', JSON.stringify(postmanCollection, null, 4), (err) => {
    if (err) {
      console.log('Error writing to file', err);
    }

    console.log(JSON.stringify(postmanCollection, null, 4));
  });
});