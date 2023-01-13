import { UserSchema } from "../node/user.schema.js";
import { schemaBuilder } from "../schema-builder.js";

class Guest {
  public readonly updatedAt: Date = new Date();
}

const GuestSchema = schemaBuilder.objectType(Guest, {
  name: "Guest",
  isTypeOf: (value) => value instanceof Guest,
  fields: (t) => ({
    updatedAt: t.expose("updatedAt", { type: "Date" }),
  }),
});

const ViewerSchema = schemaBuilder.unionType("Viewer", {
  types: [UserSchema, GuestSchema],
});

schemaBuilder.queryField("viewer", (t) =>
  t.field({
    authScopes: {
      unauthenticated: true,
      user: true,
      admin: true,
    },
    type: ViewerSchema,
    resolve: async (_root, _args, context) => {
      return context.currentUser ?? new Guest();
    },
  })
);
