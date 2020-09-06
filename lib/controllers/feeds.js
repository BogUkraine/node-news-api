const Show = require('../services/feeds/Show');
const Create = require('../services/feeds/Create.js');
const Delete = require('../services/feeds/Delete');
const PostFromApi = require('../services/feeds/PostFromApi');

module.exports.show = async (req, res) => {
    runUseCase(Show, {...req.params}, res);
}

module.exports.create = async (req, res) => {
    runUseCase(Create, {...req.body}, res);
}

module.exports.delete = async (req, res) => {
    runUseCase(Delete, {...req.params}, res);
}

module.exports.postFromApi = async () => {
    runCronOperation(PostFromApi, {}, {});
}

const runUseCase = async (UseCase, params, res) => {
    const useCase = new UseCase({});
    const result = await useCase.run(params, res);
    return res.send(result);
}

const runCronOperation = async (UseCase, params) => {
    const useCase = new UseCase({});
    const result = await useCase.run(params);
    console.log(result);
}