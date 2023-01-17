import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import type { Id } from "src/value-objects/id.js";
import type { Token } from "src/value-objects/token.js";
import type { Session } from "../modules/sessions/domain/session.js";
import type { SessionGateway } from "../modules/sessions/gateway/session.gateway.js";
import type { User } from "../modules/users/domain/user.js";
import type { UserGateway } from "../modules/users/infrastructure/user.gateway.js";
import type { Password } from "../value-objects/password.js";
import type { Quantity } from "../value-objects/quantity.js";
import type { Username } from "../value-objects/username.js";

const schemaBuilder = new SchemaBuilder<{
  Context: {
    currentUser?: User;
    currentSession?: Session;
    userGateway: UserGateway;
    sessionGateway: SessionGateway;
  };
  AuthScopes: {
    unauthenticated: boolean;
    user: boolean;
    admin: boolean;
  };
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    Id: {
      Input: Id;
      Output: Id;
    };
    Username: {
      Input: Username;
      Output: Username;
    };
    Password: {
      Input: Password;
      Output: Password;
    };
    Token: {
      Input: Token;
      Output: Token;
    };
    Quantity: {
      Input: Quantity;
      Output: Quantity;
    };
  };
}>({
  plugins: [ScopeAuthPlugin],
  scopeAuthOptions: {
    cacheKey: (val) => JSON.stringify(val),
    runScopesOnType: true,
  },
  authScopes: async (context) => {
    return {
      unauthenticated: !context.currentUser,
      user: !!context.currentUser,
      admin: false,
    };
  },
});

export { schemaBuilder };
