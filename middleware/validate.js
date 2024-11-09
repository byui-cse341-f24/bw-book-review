const validator = require('../validators/validate');

const saveBookReview = async (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        rating: 'required|integer|min:1|max:5',
        review: 'string',
        genre: 'required'|'string',
        userId: 'required'|'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveUser = async (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        email: 'required|string'
    }; 
    validator(req.body, validationRule(), {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            })
        } else {
            next();
        }
    });
};



module.exports = { saveBookReview, saveUser };
