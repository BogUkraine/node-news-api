const GetAccess     = require('../services/googleAuth/GetAccess');
const WorkWithToken = require('../services/googleAuth/WorkWithToken');

const { runUseCaseGoogleAuth } = require('../utils/runUseCase.js');

module.exports.getAccess = async (req, res) => {
    runUseCaseGoogleAuth(GetAccess, {}, res);
}

module.exports.workWithToken = async (req, res) => {
    runUseCaseGoogleAuth(WorkWithToken, { ...req.query }, res);
}