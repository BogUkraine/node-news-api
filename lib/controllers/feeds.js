const Show = require('../services/feeds/Show');
const PostFromApi = require('../services/feeds/PostFromApi');
const User = require('../models/User');

module.exports.show = async (req, res) => {
    runUseCase(Show, {...req.params}, res);
}

module.exports.create = async (req, res) => {
    runUseCase(Show, {...req.params}, res);
}

module.exports.postFromApi = async () => {
    runCronOperation(PostFromApi, {}, {});
}

const runUseCase = async (UseCase, params, res) => {
    const useCase = new UseCase({});
    const result = await useCase.run(params);
    return res.send(result);
}

const runCronOperation = async (UseCase, params) => {
    const useCase = new UseCase({});
    const result = await useCase.run(params);
    console.log(result);
}