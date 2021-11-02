const createError = require('http-errors')
const jwt = require('../utils/jwt')

exports.notFound= async(req,res, next) => {
    next(createError.NotFound('Route not Found'))
}


exports.errorMessage= async(err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
}


exports.auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized('Token invalido'))
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return next(createError.Unauthorized())
    }
    await jwt.verifyAccessToken(token).then(user => {
        req.user = user
        next()
    }).catch (e => {
        next(createError.Unauthorized(e.message))
    })
}