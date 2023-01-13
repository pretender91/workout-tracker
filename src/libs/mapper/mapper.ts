export abstract class Mapper<Domain, DTO> {
  public abstract toDomain(dto: DTO): Domain;

  public abstract toDTO(domain: Domain): DTO;

  public toDomainArray(dtos: DTO[]): Domain[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  public toDTOArray(domains: Domain[]): DTO[] {
    return domains.map((domain) => this.toDTO(domain));
  }
}
