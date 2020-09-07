const LIVR = require('livr');

class BaseUseCase {
    constructor (args = {}) {
        this.context = args.context;
    }

    async run(params) {
        const cleanParams = await this.validate(params);
        return this.execute(cleanParams);
    }

    async validate(params) {
        const validator = new LIVR.Validator(this.constructor.validationRules);
        const validData = await validator.validate(params);

        if (validData) {
            return validData;
        }

        throw validator.getErrors();
    }
}

module.exports = BaseUseCase;