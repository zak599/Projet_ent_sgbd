const { MongoClient } = require('mongodb');
//mongodb://user:pass@localhost

const url = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}`;
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log('connected successfully');
    } catch (err) {
        console.error('error connecting');
        process.exit(1);
    }
})();

module.exports = client;