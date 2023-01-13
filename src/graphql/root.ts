import "./mutation/mutation.js";
import "./query/query.js";
import "./root.ts";
import "./scalars/scalars.js";
import { schemaBuilder } from "./schema-builder.js";

schemaBuilder.queryType();
schemaBuilder.mutationType();
