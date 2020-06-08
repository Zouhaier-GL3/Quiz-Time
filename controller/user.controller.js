const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');


module.exports.authenticate = (req, res, next) => {

    console.log(req.body)
    // call for passport authentication

    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware

        if (err) return res.status(400).json(err);

        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });

        // unknown user or wrong password

        else return res.status(404).json(info);

    })(req, res);

}
module.exports.userProfile = (req, res, next) => {

    User.findOne({ _id: req._id },

        (err, user) => {

            if (!user)

                return res.status(404).json({ status: false, message: 'User record not found.' });

            else

                return res.status(200).json(user);

        }

    );


}
module.exports.listuser = (req, res, next) => {

    User.find({ roles: 'user' },

        (err, users) => {

            if (!users)

                return res.status(404).json({ status: false, message: 'Users record not found.' });

            else

                return res.status(200).json(users);

        }

    );


}

module.exports.listadmin = (req, res, next) => {

    User.find({ roles: "admin" },

        (err, users) => {

            if (!users)

                return res.status(404).json({ status: false, message: 'admin record not found.' });

            else

                return res.status(200).json(users);

        }

    );


}
module.exports.listseller = (req, res, next) => {

    User.find({ roles: "seller" },

        (err, users) => {

            if (!users)

                return res.status(404).json({ status: false, message: 'seller record not found.' });

            else

                return res.status(200).json(users);

        }

    );


}
module.exports.deleteuser = (req, res, next) => {
    console.log(req.params.id)
    let user = User.findByIdAndRemove(req.params.id)
    console.log(user)
    return res.send({ "message": "user deleted" });
}