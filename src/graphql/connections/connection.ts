import type { Connection } from "../../libs/pagination.js";
import { PageInfo } from "../../libs/pagination.js";
import { schemaBuilder } from "../schema-builder.js";

export const PageInfoSchema = schemaBuilder.objectType(PageInfo, {
  name: "PageInfo",
  isTypeOf: (value) => value instanceof PageInfo,
  fields: (t) => ({
    hasNextPage: t.exposeBoolean("hasNextPage"),
    hasPreviousPage: t.exposeBoolean("hasPreviousPage"),
    startCursor: t.expose("startCursor", { type: "Id", nullable: true }),
    endCursor: t.expose("endCursor", { type: "Id", nullable: true }),
  }),
});

export const ConnectionInterface = schemaBuilder
  .interfaceRef<Connection<any>>("Connection")
  .implement({
    fields: (t) => ({
      totalCount: t.exposeInt("totalCount"),
      pageInfo: t.expose("pageInfo", { type: PageInfoSchema }),
    }),
  });

export function addPaginationParams() {}
