import SchemaBuilder from "@pothos/core";
import ErrorsPlugin from "@pothos/plugin-errors";
import type { UserGateway } from "./modules/users/infrastructure/user.gateway.js";

const schemaBuilder = new SchemaBuilder<{
  Context: {
    userGateway: UserGateway;
  };
}>({
  plugins: [ErrorsPlugin],
  errorOptions: {
    defaultTypes: [Error],
  },
});

export { schemaBuilder };
