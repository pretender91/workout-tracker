export enum CompareResult {
  Greater = 1,
  Equal = 0,
  Lower = -1,
}

export interface Comparable {
  compare(other: this): CompareResult;
}
