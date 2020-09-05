const LIVR = require('livr');

class BaseUseCase {
    constructor(args = {}) {
        console.log(args)
    }

    async run(params) {
        const cleanParams = await this.validate(params);
        return this.execute(cleanParams);
    }

    async validate(params) {
        const validator = new LIVR.Validator(this.constructor.validationRules);
        const validData = validator.validate(params);

        if (validData) {
            return validData;
        } 

        throw new Error(validator.getErrors());
    }
}

module.exports = BaseUseCase;