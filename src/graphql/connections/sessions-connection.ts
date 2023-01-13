import type { Connection, Edge } from "../../libs/pagination.js";
import { Session } from "../../modules/sessions/domain/session.js";
import { schemaBuilder } from "../schema-builder.js";
import { ConnectionInterface } from "./connection.js";

const SessionEdgeSchema = schemaBuilder
  .objectRef<Edge<Session>>("SessionEdge")
  .implement({
    fields: (t) => ({
      cursor: t.expose("cursor", { type: "Id" }),
      node: t.expose("node", { type: Session }),
    }),
  });

export const SessionsConnectionSchema = schemaBuilder
  .objectRef<Connection<Session>>("SessionsConnection")
  .implement({
    interfaces: [ConnectionInterface],
    fields: (t) => ({
      edges: t.expose("edges", { type: [SessionEdgeSchema] }),
    }),
  });
