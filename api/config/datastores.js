/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  /***************************************************************************
  *                                                                          *
  * Your app's default datastore.                                            *
  *                                                                          *
  * Sails apps read and write to local disk by default, using a built-in     *
  * database adapter called `sails-disk`.  This feature is purely for        *
  * convenience during development; since `sails-disk` is not designed for   *
  * use in a production environment.                                         *
  *                                                                          *
  * To use a different db _in development_, follow the directions below.     *
  * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
  *                                                                          *
  * (For production configuration, see `config/env/production.js`.)          *
  *                                                                          *
  ***************************************************************************/

  default: {

    /***************************************************************************
    *                                                                          *
    * Want to use a different database during development?                     *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then pass it in, along with a connection URL.                         *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
   adapter: process.env.MAIN_DB_ADAPTER,
  //  url: 'mongodb://' + process.env.MAIN_DB_USER + ':' + process.env.MAIN_DB_PASSWORD + '@' + process.env.MAIN_DB_HOST + ':' + process.env.MAIN_DB_PORT + '/' + process.env.MAIN_DB_DB,
  url: 'mongodb://'  + process.env.MAIN_DB_USER + ':' + process.env.MAIN_DB_PASSWORD + '@bunny-shard-00-00.sk2k7.mongodb.net:27017,bunny-shard-00-01.sk2k7.mongodb.net:27017,bunny-shard-00-02.sk2k7.mongodb.net:27017/'+ process.env.MAIN_DB_DB +'?ssl=true&replicaSet=atlas-eyy5wn-shard-0&authSource=admin&retryWrites=true&w=majority'
  },


};
