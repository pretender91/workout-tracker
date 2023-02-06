---
to: src/modules/<%= name %>/infrastructure/<%= h.inflection.singularize(name) %>.gateway.ts
---
<%
 FormattedName = h.inflection.camelize(h.inflection.singularize(name))
%>
import type { <%= FormattedName %> } from "../domain/<%= h.inflection.singularize(name) %>.js";
import type {
  Connection,
  PaginationParams,
} from "../../../libs/pagination.js";
import type { Context } from "../../../context.js";

type CreateParams = {}
type UpdateParams = {}
type RemoveParams = Pick<<%= FormattedName %>, "id">;
type FindByIdParams = Pick<<%= FormattedName %>, "id">;
type FindAllParams = { pagination: PaginationParams, filter?: Partial<{}> };

export interface <%= FormattedName %>Gateway {
  create: (params: CreateParams) => Promise<<%= FormattedName %>>;
  update: (params: UpdateParams) => Promise<<%= FormattedName %>>;
  removeById: (params: RemoveParams) => Promise<void>;
  findById: (params: FindByIdParams) => Promise<<%= FormattedName %> | null>;
  findAll: (params: FindAllParams) => Promise<Connection<<%= FormattedName %>>>;
}

type Prisma<%= FormattedName %>GatewayContext = Pick<Context, "prisma" | "<%= h.inflection.singularize(name) %>Mapper">

export class Prisma<%= FormattedName %>Gateway implements <%= FormattedName %>Gateway {
  constructor(private readonly context: Prisma<%= FormattedName %>GatewayContext) {}

  public async create(params: CreateParams): Promise<<%= FormattedName %>> {
    throw new Error("Method not implemented.");
  }

  public async update(params: UpdateParams): Promise<<%= FormattedName %>> {
    throw new Error("Method not implemented.");
  }

  public async removeById(params: RemoveParams): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async findById(params: FindByIdParams): Promise<<%= FormattedName %> | null> {
    throw new Error("Method not implemented.");
  }

  public async findAll(params: FindAllParams): Promise<Connection<<%= FormattedName %>>> {
    throw new Error("Method not implemented.");
  }
}

