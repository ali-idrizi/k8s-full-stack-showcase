import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

export function Match(
  property: string,
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const relatedPropertyName = args.constraints[0] as string
    const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName]
    return value === relatedValue
  }
}
