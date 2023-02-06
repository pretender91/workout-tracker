---
to: src/modules/<%= module %>/application/<%= h.changeCase.paramCase(name) %>.ts
---
<%
 FormattedName = h.inflection.camelize(name)
%>
import type { Context } from "../../../context.js";
import type { UseCase } from "../../../libs/use-case.js";

type <%= FormattedName %>Input = {}
type <%= FormattedName %>Output = {}
type <%= FormattedName %>Context = Pick<Context, "">

export class <%= FormattedName %> implements UseCase<<%= FormattedName %>Input, <%= FormattedName %>Output> {
  constructor(private readonly context: <%= FormattedName %>Context) {}

  public async execute(input: <%= FormattedName %>Input): Promise<<%= FormattedName %>Output> {
    throw new Error("Method not implemented.");
  }
}