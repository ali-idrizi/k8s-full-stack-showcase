import { HashUtil } from 'src/common/utils/hash.util'

describe('HashUtil', () => {
  describe(HashUtil.hash, () => {
    it('should return a long hash', async () => {
      const hash = await HashUtil.hash('password')
      expect(hash.length).toBeGreaterThan(20)
    })
  })

  describe(HashUtil.isValid, () => {
    let hash: string

    beforeAll(async () => {
      hash = await HashUtil.hash('password')
    })

    it('should return true if password is correct', async () => {
      const isPasswordValid = await HashUtil.isValid('password', hash)
      expect(isPasswordValid).toBe(true)
    })

    it('should return false if password is incorrect', async () => {
      const isPasswordValid = await HashUtil.isValid('incorrect-password', hash)
      expect(isPasswordValid).toBe(false)
    })
  })
})
