---
to: src/modules/<%= name %>/infrastructure/<%= h.inflection.singularize(name) %>.mapper.ts
---
<%
 FormattedName = h.inflection.camelize(h.inflection.singularize(name))
%>
import { Mapper } from "../../../libs/mapper/mapper.js";
import type { <%= FormattedName %> } from "../domain/<%= h.inflection.singularize(name) %>.js";
import type { <%= FormattedName %>DTO } from "./<%= h.inflection.singularize(name) %>.dto.js";
import { Id } from "../../../value-objects/id.js";

export class <%= FormattedName %>Mapper extends Mapper<<%= FormattedName %>, <%= FormattedName %>DTO> {
    public toDomain(dto: <%= FormattedName %>DTO): <%= FormattedName %> {
        return new <%= FormattedName %>({
            id: Id.fromString(dto.id),
        });
    }

    public toDTO(domain: <%= FormattedName %>): <%= FormattedName %>DTO {
        return {
            id: domain.id.valueOf(),
        };
    }
}