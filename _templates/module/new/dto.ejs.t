---
to: src/modules/<%= name %>/infrastructure/<%= h.inflection.singularize(name) %>.dto.ts
---
<%
 FormattedName = h.inflection.camelize(h.inflection.singularize(name))
%>
export { <%= FormattedName %> as <%= FormattedName %>DTO } from "@prisma/client";
