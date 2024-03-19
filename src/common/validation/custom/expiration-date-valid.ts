import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export class IsExpirationYearValidConstraints{
    minYears: number;
    maxYears: number;
}

export function IsExpirationYearValid(
    yearConstraints: IsExpirationYearValidConstraints,
    validationOptions?: ValidationOptions,
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsExpirationYearValid',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [yearConstraints],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [yearConstraints] = args.constraints;
                    const { minYears, maxYears } = yearConstraints;
                    const currentYear = new Date().getFullYear();

                    const startYear = currentYear + minYears;
                    const endYear = startYear + maxYears;

                    const validYears = Array.from(
                        { length: endYear - startYear + 1 },
                        (_, i) => startYear + i,
                    );
                    return validYears.includes(parseInt(value));
                },
                defaultMessage(args: ValidationArguments) {
                    const [yearConstraints] = args.constraints;
                    const { minYears, maxYears } = yearConstraints;
                    const currentYear = new Date().getFullYear();
                    const startYear = currentYear + minYears;
                    const endYear = startYear + maxYears;
                    return `The expiration year must be from ${startYear} to ${endYear}`;
                },
            },
        });
    };
}
