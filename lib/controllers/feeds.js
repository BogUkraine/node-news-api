const Show = require('../services/feeds/Show');
const User = require('../models/User');

module.exports.show = async (req, res) => {
    runUseCase(Show, {}, res);
}

module.exports.create = async (req, res) => {
    runUseCase(Show, {...req.params}, res);
}

const runUseCase = async (UseCase, params, res) => {
    const useCase = new UseCase({});
    const result = await useCase.run(params);
    return res.send(result);
}