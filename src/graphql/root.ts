import "./mutation/mutation.js";
import "./query/query.js";
import "./scalars/scalars.js";
import { schemaBuilder } from "./schema-builder.js";

schemaBuilder.queryType();
schemaBuilder.mutationType();
