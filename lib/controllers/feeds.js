const Show = require('../services/feeds/Show');
const Create = require('../services/feeds/Create.js');
const Delete = require('../services/feeds/Delete');
const PostFromApi = require('../services/feeds/PostFromApi');

const { runUseCase, runCronOperation } = require('../utils/runUseCase.js');

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