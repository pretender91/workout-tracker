import "./root.ts";
import { schemaBuilder } from "./schema-builder.js";

export const schema = schemaBuilder.toSchema();
