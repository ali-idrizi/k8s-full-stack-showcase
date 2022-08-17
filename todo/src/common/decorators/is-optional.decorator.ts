import { ValidateIf, ValidationOptions } from 'class-validator'

/**
 * Checks if value is undefined and if so, ignores all validators
 */
export function IsOptional(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_object, value) => value !== undefined, validationOptions)
}
