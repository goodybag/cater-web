import ValidationError from './validation-error';
import {isArray, isBoolean, isDate, isInteger, isObject} from 'lodash';

const validator = {
    assert(expression, message) {
        if(!expression) throw new ValidationError(message);
    },

    bySchema(schema, attrs) {
        const error = new ValidationError('Invalid attributes');

        for (let column in attrs) {
            try {
                schema[column]( attrs[column] );
            } catch (err) {
                if (err instanceof ValidationError) {
                    error.columns[column] = err;
                } else {
                    throw err;
                }
            }
        }

        if (Object.keys(error.columns).length > 0) {
            throw error;
        }
    },

    isArray(arr) {
        if (!isArray(arr)) throw new ValidationError(`${arr} is not an Array`);
    },

    isBoolean(bool) {
        if (!isBoolean(bool)) throw new ValidationError(`${bool} is not a Boolean`);
    },

    isDate(date) {
        if (!isDate(date)) throw new ValidationError(`${date} is not a Date`);
    },

    isInteger(int) {
        if (!isInteger(int)) throw new ValidationError(`${int} is not an Integer`);
    },

    isObject(obj) {
        if (!isObject(obj)) throw new ValidationError(`${obj} is not an Object`);
    }
};

export default validator;
