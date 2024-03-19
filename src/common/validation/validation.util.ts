import { ValidationError } from 'class-validator';

export const validateRequiredFields = (
    errors: ValidationError[],
): ValidationError[] => {
    return errors.map((error) => {
        if (error.value !== undefined) return error;
        const newError: ValidationError = {
            property: error.property,
            constraints: {
                isRequired: `The ${error.property} is required`,
            },
            children: error.children,
            target: error.target,
            value: error.value,
        };
        return newError;
    });
};

export const toValidate = (metatype: Function): boolean => {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
};
