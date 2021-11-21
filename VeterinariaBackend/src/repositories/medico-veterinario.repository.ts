import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MedicoVeterinario, MedicoVeterinarioRelations, ClinicaVeterinaria} from '../models';
import {ClinicaVeterinariaRepository} from './clinica-veterinaria.repository';

export class MedicoVeterinarioRepository extends DefaultCrudRepository<
  MedicoVeterinario,
  typeof MedicoVeterinario.prototype.Id,
  MedicoVeterinarioRelations
> {

  public readonly clinicaVeterinaria: BelongsToAccessor<ClinicaVeterinaria, typeof MedicoVeterinario.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClinicaVeterinariaRepository') protected clinicaVeterinariaRepositoryGetter: Getter<ClinicaVeterinariaRepository>,
  ) {
    super(MedicoVeterinario, dataSource);
    this.clinicaVeterinaria = this.createBelongsToAccessorFor('clinicaVeterinaria', clinicaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('clinicaVeterinaria', this.clinicaVeterinaria.inclusionResolver);
  }
}
