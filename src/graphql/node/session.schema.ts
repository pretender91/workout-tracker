import { Session } from "../../modules/sessions/domain/session.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";

export const SessionSchema = schemaBuilder.objectType(Session, {
  name: "Session",
  interfaces: [NodeSchema],
  isTypeOf: (value) => value instanceof Session,
  fields: (t) => ({
    userId: t.expose("userId", { type: "Id" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    token: t.expose("token", {
      type: "Token",
    }),
  }),
});
