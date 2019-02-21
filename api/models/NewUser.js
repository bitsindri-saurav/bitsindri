/**
 * NewUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'String',
      unique: true,
      required: true
    },
    sessionId: {
      type: 'String',
      required: true
    },
    user_type: {
      type: "string",
    }
  }
};
