import type { Id } from "../value-objects/id.js";
import { Quantity } from "../value-objects/quantity.js";

export class PageInfo {
  public readonly hasNextPage: boolean;
  public readonly hasPreviousPage: boolean;
  public readonly startCursor: Id | null;
  public readonly endCursor: Id | null;

  public constructor(params: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: Id | undefined;
    endCursor: Id | undefined;
  }) {
    this.hasNextPage = params.hasNextPage;
    this.hasPreviousPage = params.hasPreviousPage;
    this.startCursor = params.startCursor ?? null;
    this.endCursor = params.endCursor ?? null;
  }
}

export class Edge<T> {
  cursor: Id;
  node: T;

  constructor(params: { cursor: Id; node: T }) {
    this.cursor = params.cursor;
    this.node = params.node;
  }
}

export class ForwardPaginationParams {
  public readonly first: Quantity;
  public readonly after: Id | null;

  constructor(params?: { first?: Quantity; after?: Id }) {
    this.first = params?.first ?? Quantity.fromNumber(10);
    this.after = params?.after ?? null;
  }
}

export class BackwardPaginationParams {
  public readonly last: Quantity;
  public readonly before: Id | null;

  constructor(params?: { last?: Quantity; before?: Id }) {
    this.last = params?.last ?? Quantity.fromNumber(10);
    this.before = params?.before ?? null;
  }
}

export type PaginationParams =
  | ForwardPaginationParams
  | BackwardPaginationParams;

export class Connection<E> {
  public readonly totalCount: number;
  public readonly edges: Edge<E>[];
  public readonly pageInfo: PageInfo;

  public constructor(params: {
    edges: Edge<E>[];
    pageInfo: PageInfo;
    totalCount: number;
  }) {
    this.totalCount = params.totalCount;
    this.edges = params.edges;
    this.pageInfo = params.pageInfo;
  }
}

export function parsePaginationParams(params: {
  first?: Quantity | null;
  after?: Id | null;
  last?: Quantity | null;
  before?: Id | null;
}): PaginationParams {
  const forwardParams = {
    first: params.first,
    after: params.after,
  };

  const backwardParams = {
    last: params.last,
    before: params.before,
  };

  const forwardParamsKeys = Object.entries(forwardParams).filter(
    ([key, value]) => !!value && ["first", "after"].includes(key)
  );

  const backwardParamsKeys = Object.entries(backwardParams).filter(
    ([key, value]) => !!value && ["last", "before"].includes(key)
  );

  if (forwardParamsKeys.length > 0 && backwardParamsKeys.length > 0) {
    throw new Error(
      `Invalid pagination params. You can not use ${[
        ...forwardParamsKeys,
        ...backwardParamsKeys,
      ]
        .map((key) => `"${key}"`)
        .join(", ")} args at the same time.`
    );
  }

  if (forwardParamsKeys.length > 0) {
    return new ForwardPaginationParams({
      first: forwardParams.first ?? undefined,
      after: forwardParams.after ?? undefined,
    });
  }

  if (backwardParamsKeys.length > 0) {
    return new BackwardPaginationParams({
      last: backwardParams.last ?? undefined,
      before: backwardParams.before ?? undefined,
    });
  }

  return new ForwardPaginationParams();
}
