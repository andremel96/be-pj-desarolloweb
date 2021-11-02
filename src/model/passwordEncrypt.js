var bcrypt = require('bcrypt');

exports.cryptPassword = function (password) {
    let hash = bcrypt.hashSync(password, 10, function (err, hash) {
        if (err) {
            return password;
        } else {
            return hash;
        }
    });
    return hash;
};

exports.comparePassword = function (plainPass, hash) {
    let isValid = bcrypt.compareSync(plainPass, hash, function (err, result) {
        return result
    });
    return isValid;
};