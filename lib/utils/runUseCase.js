const checkToken = require('./auth');

const runUseCase = async (UseCase, params, res, headers) => {
    try {
        let decoded = {};

        if (headers) {
            decoded = await checkToken(headers);
        }

        const useCase = new UseCase({ context: { userId : decoded.userId } });
        const result = await useCase.run({ ...params });
        
        return res.send({
            status : 1,
            data   : result
        });
    } catch (error) {
        console.log(error)
        return res.send({
            status : 0,
            error: {
                code   : 'ERROR',
                fields : error
            }
        });
    }
}

const runUseCaseGoogleAuth = async (UseCase, params, res) => {
    try {
        const useCase = new UseCase({});
        const result = await useCase.run({ ...params });
        
        if (result.redirectLink) {
            return res.redirect(result.redirectLink);
        }
        
        return res.send({
            status : 1,
            data   : result
        });
    } catch (error) {
        console.log(error)
        return res.send({
            status : 0,
            error: {
                code   : 'ERROR',
                fields : error
            }
        });
    }
}

const runCronOperation = async (UseCase, params) => {
    const useCase = new UseCase({});
    const result = await useCase.run(params);
    console.log(result);
}

module.exports = { runUseCase, runCronOperation, runUseCaseGoogleAuth }