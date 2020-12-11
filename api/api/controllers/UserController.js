/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const sanitize = require('mongo-sanitize');

module.exports = {
  /**
   * This function creates a user 
   * @param { name: string } 
   */
  create: async (req, res) => {
    const params = sanitize(req.allParams());
    try {
      const result = await User.create(params);
      return res.send(result);
    } catch (err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },
  /**
   * This function deletes a user from the db and delete related tasks
   * @param { id: string }
   */

  delete: async (req, res) => {
    const params = req.allParams();
    const query = {id: params.id };
    try {
      const result = await User.destroyOne(query);
      return res.send(result);
    } catch(err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },
   /**
   * This function updates a user
   * @param {
   * id: string
   * name: string
   * }
   */
  update: async (req, res) => {
    const params = sanitize(req.allParams());
    const query = {id: params.id };
    const valuesToSet = {name: params.name};
    try {
      const result = await User.updateOne(query).set(valuesToSet);
      res.send(result);
    } catch(err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },
  /**
   * This function retrieves all users
   * @returns {array} list of users
   */
  getAll: async (req, res) => {
    try {
      const result = await User.find();
      if (result) {
        res.send(result);
      } else {
        res.sendStatus(404)
      }
    } catch(err) {
      console.log(err)
      return res.status(err.status).send(err.message);
    }
  },

};


