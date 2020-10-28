const User = require('../models/user');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User already exists'
            });
        }
        const newUser = new User({ name, email, password });
        newUser.save((err, saved) => {
            if(err){
                return res.status(400).json({
                    error: 'Sorry, something went wrong'
                });
            }

            const { _id, name, email, role } = saved;
            return res.status(201).json({
                user: { _id, email, name, role }
            });
        })
    })
};