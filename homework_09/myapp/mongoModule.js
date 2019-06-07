const MongoClient = require('mongodb').MongoClient;

module.exports = {
    myFunction: async (query) => {
      let client;
      try {
        client = await MongoClient.connect(process.env.MONGO_ATLAS, { useNewUrlParser: true });
        global.db = client.db("homework07");
        return await global.db.collection('lectures').find(query).toArray();
      } catch(error) {
        console.log(error);
      }
    //   finally {
    //       console.log("close")
    //     client.close();
    //   }
    }
  }