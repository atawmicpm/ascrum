/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var UserController = {

  // findByUserName: function(req, res) {
  //   User.findOneByUserName(req.param('name')).exec(function(err, user){
  //     if (user === undefined) {
  //       res.send('User ' + req.param('name') + ' not found!');
  //     }
  //     else {
  //       res.json(user);
  //     }
  //   });
  // },
 
  login: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOneByEmail(req.param('email')).done(function (err, user) {
      if (err) res.json({ error: 'DB error' }, 500);

      if (user) {
        bcrypt.compare(req.param('password'), user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            res.json(user);
          } else {
            // invalid password
            req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
      } else {
        res.json({ error: 'User not found' }, 404);
      }
    });
  },

  logout: function(req, res) {
    req.session.user = null;
    res.json({ success: 'Logged out'});
  }
  



}


module.exports = UserController;
