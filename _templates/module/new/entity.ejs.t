---
to: src/modules/<%= name %>/domain/<%= h.inflection.singularize(name) %>.ts
---
<%
 FormattedName = h.inflection.camelize(h.inflection.singularize(name))
%>

import { Entity } from "../../../libs/entity/entity.js";

type <%= FormattedName %>Params = Pick<
  <%= FormattedName %>, "id"
>;

export class <%= FormattedName %> extends Entity {
  constructor(params: <%= FormattedName %>Params) {
    super(params.id);
  }
}
