/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is unique, proceed to the next policy, 
  // or if this is the last policy, the controller

  User.findOneByUserName(req.param('userName')).done(function(err, user) {
    if (user) {
      return res.send(409);
    } else {
      return next();
    }
  });
};
