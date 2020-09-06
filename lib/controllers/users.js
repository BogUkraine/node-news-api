const Login = require('../services/users/Login');
const Register = require('../services/users/Login');

const { runUseCase } = require('../utils/runUseCase.js');

module.exports.login = async (req, res) => {
    runUseCase(Login, {...req.body}, res);
}

module.exports.register = async (req, res) => {
    runUseCase(Register, {...req.body}, res);
}