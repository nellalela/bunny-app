/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const sanitize = require('mongo-sanitize');

module.exports = {
  /**
   * This function creates a task
   * @param { 
   * description: string
   * status: string
   * userId: string
   * } 
   */
  create: async (req, res) => {
    const params = sanitize(req.allParams());
    try {
      const result = await Task.create(params);
      return res.send(result);
    } catch (err) {
      return res.status(err.status).send(err);
    }
  },
  /**
   * This function deletes a task from the db
   * @param { id: string }
   */
  delete: async (req, res) => {
    const params = req.allParams();
    const query = {id: params.id };
    try {
      const result = await Task.destroyOne(query);
      return res.send(result);
    } catch(err) {
      return res.send(err);
    }
  },
  /**
   * This function updates a task
   * @param {
   * id: string
   * key: string
   * toUpdate: string}
   */
  update: async (req, res) => {
    const params = sanitize(req.allParams());
    const query = {id: params.id };
    const valuesToSet = {[params.key]: params.toUpdate};
    try {
      const result = await Task.updateOne(query).set(valuesToSet);
      res.send(result);
    } catch(err) {
      return res.send(err);
    }
  },
  /**
   * This function retrieves all tasks
   * @returns {array} list of tasks
   */
  getAll: async (req, res) => {
    try {
      const result = await Task.find();
      if (result) {
        res.send(result);
      } else {
        res.sendStatus(404)
      }
    } catch(err) {
      return res.send(err);
    }
  },
  

};


