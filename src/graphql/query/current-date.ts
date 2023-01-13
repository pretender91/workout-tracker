import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("currentDate", (t) =>
  t.field({
    type: "Date",
    resolve: () => new Date(),
  })
);
