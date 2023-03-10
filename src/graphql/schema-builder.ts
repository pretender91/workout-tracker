import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import type { Context } from "src/context.js";
import type { ExerciseName } from "../value-objects/exercise-name.js";
import type { Id } from "../value-objects/id.js";
import type { MuscleName } from "../value-objects/muscle-name.js";
import type { Password } from "../value-objects/password.js";
import type { Quantity } from "../value-objects/quantity.js";
import type { Token } from "../value-objects/token.js";
import type { Username } from "../value-objects/username.js";
import type { Weight } from "../value-objects/weight.js";

class UserRole {}

const schemaBuilder = new SchemaBuilder<{
  Context: Context;
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
    UserRole: {
      Input: UserRole;
      Output: UserRole;
    };
    Password: {
      Input: Password;
      Output: Password;
    };
    Token: {
      Input: Token;
      Output: Token;
    };
    ExerciseName: {
      Input: ExerciseName;
      Output: ExerciseName;
    };
    MuscleName: {
      Input: MuscleName;
      Output: MuscleName;
    };
    Quantity: {
      Input: Quantity;
      Output: Quantity;
    };
    Weight: {
      Input: Weight;
      Output: Weight;
    };
  };
}>({
  plugins: [ScopeAuthPlugin],
  scopeAuthOptions: {
    cacheKey: (val) => JSON.stringify(val),
  },
  authScopes: async (context) => {
    console.log("authScopes", {
      unauthenticated: !context.currentUser,
      user: context.currentUser?.role.isUser === true,
      admin: context.currentUser?.role.isAdmin === true,
    });
    return {
      unauthenticated: !context.currentUser,
      user: context.currentUser?.role.isUser === true,
      admin: context.currentUser?.role.isAdmin === true,
    };
  },
});

export { schemaBuilder };
