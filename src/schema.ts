import { schemaBuilder } from "./schema-builder.js";

import "./libs/errors/errors.schema.js";
import "./modules/users/application/user.schema.js";

schemaBuilder.queryType();
schemaBuilder.mutationType();

export const schema = schemaBuilder.toSchema();
