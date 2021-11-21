import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AsistenteVeterinaria, AsistenteVeterinariaRelations, ClinicaVeterinaria} from '../models';
import {ClinicaVeterinariaRepository} from './clinica-veterinaria.repository';

export class AsistenteVeterinariaRepository extends DefaultCrudRepository<
  AsistenteVeterinaria,
  typeof AsistenteVeterinaria.prototype.Id,
  AsistenteVeterinariaRelations
> {

  public readonly clinicaVeterinaria: BelongsToAccessor<ClinicaVeterinaria, typeof AsistenteVeterinaria.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClinicaVeterinariaRepository') protected clinicaVeterinariaRepositoryGetter: Getter<ClinicaVeterinariaRepository>,
  ) {
    super(AsistenteVeterinaria, dataSource);
    this.clinicaVeterinaria = this.createBelongsToAccessorFor('clinicaVeterinaria', clinicaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('clinicaVeterinaria', this.clinicaVeterinaria.inclusionResolver);
  }
}
