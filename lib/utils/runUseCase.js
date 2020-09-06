const runUseCase = async (UseCase, params, res) => {
    try {
        const useCase = new UseCase({});
        const result = await useCase.run(params);
        return res.send({
            status : 1,
            data   : result
        });
    } catch (error) {
        return res.send({
            status : 0,
            error: {
                code   : 'FORMAT_ERROR',
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

module.exports = { runUseCase, runCronOperation }