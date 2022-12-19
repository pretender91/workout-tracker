import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";

const schemaBuilder = new SchemaBuilder({
  plugins: [ErrorsPlugin],
  errorOptions: {
    defaultTypes: [Error],
  },
});

export { schemaBuilder };
