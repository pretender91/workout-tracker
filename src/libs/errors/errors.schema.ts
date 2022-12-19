import { schemaBuilder } from "../../schema-builder.js";
import { ValidationError } from "./validation-error.js";

const ErrorInterface = schemaBuilder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});

schemaBuilder.objectType(Error, {
  name: "BaseError",
  isTypeOf: (value) => value instanceof Error,
  interfaces: [ErrorInterface],
});

schemaBuilder.objectType(ValidationError, {
  name: "ValidationError",
  isTypeOf: (value) => value instanceof ValidationError,
  fields: (t) => ({
    path: t.string({
      resolve: (error) => error.path.join("."),
    }),
    message: t.exposeString("message"),
  }),
});

const AggregateErrors = schemaBuilder.unionType("AggregateErrors", {
  types: [Error, ValidationError],
});

schemaBuilder.objectType(AggregateError, {
  name: "AggregateError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    errors: t.field({
      type: [AggregateErrors],
      resolve: (p) => p.errors,
    }),
  }),
});
