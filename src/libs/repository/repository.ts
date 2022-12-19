export interface Repository<T> {
  create(entity: Partial<T>): Promise<T>;
}
