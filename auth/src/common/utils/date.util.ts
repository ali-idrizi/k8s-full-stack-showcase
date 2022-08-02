export const DateUtil = {
  /**
   * Calculate the difference in seconds between `date1` and `date2`
   *
   * @param date1
   * @param date2
   *
   * @returns Difference in seconds
   */
  getDifferenceInSeconds: (date1: Date, date2: Date): number => {
    return Math.abs(date1.getTime() - date2.getTime()) / 1000
  },

  /**
   * Check whether more than `seconds` seconds have passed since `date`
   *
   * @param date
   * @param seconds
   *
   * @returns true if more than `seconds` seconds have passed since `date`
   */
  isMoreThanSecondsAgo: (date: Date, seconds: number): boolean => {
    return DateUtil.getDifferenceInSeconds(new Date(), date) > seconds
  },
}
