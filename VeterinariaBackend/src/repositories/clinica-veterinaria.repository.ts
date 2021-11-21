import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ClinicaVeterinaria, ClinicaVeterinariaRelations, MedicoVeterinario, AsistenteVeterinaria} from '../models';
import {MedicoVeterinarioRepository} from './medico-veterinario.repository';
import {AsistenteVeterinariaRepository} from './asistente-veterinaria.repository';

export class ClinicaVeterinariaRepository extends DefaultCrudRepository<
  ClinicaVeterinaria,
  typeof ClinicaVeterinaria.prototype.Id,
  ClinicaVeterinariaRelations
> {

  public readonly medicoVeterinarios: HasManyRepositoryFactory<MedicoVeterinario, typeof ClinicaVeterinaria.prototype.Id>;

  public readonly asistenteVeterinarias: HasManyRepositoryFactory<AsistenteVeterinaria, typeof ClinicaVeterinaria.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MedicoVeterinarioRepository') protected medicoVeterinarioRepositoryGetter: Getter<MedicoVeterinarioRepository>, @repository.getter('AsistenteVeterinariaRepository') protected asistenteVeterinariaRepositoryGetter: Getter<AsistenteVeterinariaRepository>,
  ) {
    super(ClinicaVeterinaria, dataSource);
    this.asistenteVeterinarias = this.createHasManyRepositoryFactoryFor('asistenteVeterinarias', asistenteVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('asistenteVeterinarias', this.asistenteVeterinarias.inclusionResolver);
    this.medicoVeterinarios = this.createHasManyRepositoryFactoryFor('medicoVeterinarios', medicoVeterinarioRepositoryGetter,);
    this.registerInclusionResolver('medicoVeterinarios', this.medicoVeterinarios.inclusionResolver);
  }
}
