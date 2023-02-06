import type { Connection, Edge } from "../../libs/pagination.js";
import { Workout } from "../../modules/workouts/domain/workout.js";
import { schemaBuilder } from "../schema-builder.js";
import { ConnectionInterface } from "./connection.js";

const WorkoutsConnection = schemaBuilder
  .objectRef<Edge<Workout>>("WorkoutEdge")
  .implement({
    fields: (t) => ({
      cursor: t.expose("cursor", { type: "Id" }),
      node: t.expose("node", { type: Workout }),
    }),
  });

export const WorkoutsConnectionSchema = schemaBuilder
  .objectRef<Connection<Workout>>("WorkoutsConnection")
  .implement({
    interfaces: [ConnectionInterface],
    fields: (t) => ({
      edges: t.expose("edges", { type: [WorkoutsConnection] }),
    }),
  });
