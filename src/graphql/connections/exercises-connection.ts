import type { Connection, Edge } from "../../libs/pagination.js";
import { Exercise } from "../../modules/exercises/domain/exercise.js";
import { schemaBuilder } from "../schema-builder.js";
import { ConnectionInterface } from "./connection.js";

const ExerciseEdgeSchema = schemaBuilder
  .objectRef<Edge<Exercise>>("ExerciseEdge")
  .implement({
    fields: (t) => ({
      cursor: t.expose("cursor", { type: "Id" }),
      node: t.expose("node", { type: Exercise }),
    }),
  });

export const ExercisesConnectionSchema = schemaBuilder
  .objectRef<Connection<Exercise>>("ExercisesConnection")
  .implement({
    interfaces: [ConnectionInterface],
    fields: (t) => ({
      edges: t.expose("edges", { type: [ExerciseEdgeSchema] }),
    }),
  });
