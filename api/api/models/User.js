/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

/* attributes: createdAt, updatedAt & id are managed in config/models.js */

module.exports = {
  datastore : 'default',

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    nameInitials: {
      type: 'string',
      required: true
    }
  },
};

