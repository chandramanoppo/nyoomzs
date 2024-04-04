const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hashPassword = (Password) => {
    return bcrypt.hashSync(Password, salt);
};

const comparePassword = (Password, hashPassword) => {
    return bcrypt.compareSync(Password, hashPassword);
};

module.exports = { hashPassword, comparePassword };