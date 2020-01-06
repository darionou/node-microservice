const MongoClient = require('mongodb').MongoClient;

class db {
  constructor(mongo_username, mongo_password, mongo_host, mongo_port, mongo_database_name) {
    this.mongo_username = mongo_username;
    this.mongo_password = mongo_password;
    this.mongo_host = mongo_host;
    this.mongo_port = mongo_port;
    this.mongo_database_name = mongo_database_name;
    this.mongo_user = (this.mongo_username && this.mongo_password) ? `${this.mongo_username}:${this.mongo_password}@` : "";
    this.url = `mongodb://${this.mongo_user}${this.mongo_host}:${this.mongo_port}`;

    // state
    this.client = null;
    this.db = null;
  }

  // Functions
  /**
   * @returns {Db}
   */
  getDb = () => {

    if (!this.db) {
      throw Error("Connection not available");
    }
    return this.db
  };

  /**
  * Connect to db and save the instance in self variable.
  * Allow to share the connection
  */

  connect = () => {

    if (this.db) {
      console.warn("Trying to init DB again!");
    }
    let options = { useNewUrlParser: true };

    MongoClient.connect(this.url, options, (err, client) => {
      if (err) throw err;

      this.client = client;
      this.db = client.db(this.mongo_database_name);
    })
  };


  /**
   * Connect to MongoDb and return a Promise with MongoClient
   * @returns {Promise<{MongoClient, Db}>}
   */
  connectScoped = () => {

    let options = { useNewUrlParser: true };

    return new Promise((resolve, reject) => {

      MongoClient.connect(this.url, options)
        .then((client) => {
          const db = client.db(this.mongo_database_name);

          resolve({ client, db });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
 * Close the db connection and return promise with result
 *
 * @returns {Promise}
 */
  close = () => {
    return closeScopedConnection(this.client);
  };

  /**
   * Close the connection passed as parameter
   * @param client MongoClient
   */
  closeScopedConnection = (client) => {
    return new Promise(((resolve, reject) => {

      if (client && client instanceof MongoClient) {
        return client.close();
      }

      reject(new Error("client is not a valid MongoDB client connection"))
    }));
  };

}

module.exports = db;