export enum TechType {
  TECH,
  PLATFORM,
  UTILITY,
  LIBRARY,
  LANGUAGE,
}

export type TechDetails = {
  title: string
  type: TechType
}
