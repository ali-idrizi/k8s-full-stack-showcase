import { plainToInstance } from 'class-transformer'
import { IsNumber, validateSync } from 'class-validator'
import { IsOptional } from './is-optional.decorator'

class TestDto {
  @IsOptional()
  @IsNumber()
  foo?: number
}

describe('IsOptional', () => {
  it('should disable other validators when value is undefined', () => {
    const dto = plainToInstance(TestDto, { foo: undefined })
    expect(validateSync(dto)).toHaveLength(0)
  })

  it('should run other validators when value is not undefined', () => {
    let dto = plainToInstance(TestDto, { foo: 1 })
    expect(validateSync(dto)).toHaveLength(0)

    dto = plainToInstance(TestDto, { foo: '1' })
    expect(validateSync(dto)[0].constraints?.isNumber).toMatch('must be a number')

    dto = plainToInstance(TestDto, { foo: null })
    expect(validateSync(dto)[0].constraints?.isNumber).toMatch('must be a number')
  })
})
