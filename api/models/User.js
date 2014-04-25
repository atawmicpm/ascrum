/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	userName: {
      type: 'string',
      required: true,

    },

    emailAddress: {
      type: 'email',
      required: true
    },
    
    firstName: 'string',
    lastName: 'string'
  }

};
