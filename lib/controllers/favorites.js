const Show = require('../services/favorites/Show');
const Create = require('../services/favorites/Create.js');
const Delete = require('../services/favorites/Delete');

const { runUseCase } = require('../utils/runUseCase.js');

module.exports.show = async (req, res) => {
    runUseCase(Show, {...req.params}, res);
}

module.exports.create = async (req, res) => {
    runUseCase(Create, {...req.body}, res);
}

module.exports.delete = async (req, res) => {
    runUseCase(Delete, {...req.params}, res);
}