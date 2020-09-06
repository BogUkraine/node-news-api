const LIVR = require('livr');

class BaseUseCase {
    constructor(args = {}) {
    }

    async run(params, res) {
        const cleanParams = await this.validate(params, res);
        return this.execute(cleanParams);
    }

    async validate(params, res) {
        const validator = new LIVR.Validator(this.constructor.validationRules);
        const validData = validator.validate(params);

        if (validData) {
            return validData;
        }

        return res.status(400).send({
            status : 0, 
            fields : validator.errors
        });
    }
}

module.exports = BaseUseCase;