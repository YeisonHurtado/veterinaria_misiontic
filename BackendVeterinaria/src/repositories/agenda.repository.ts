import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Agenda, AgendaRelations, Empleado, ClienteAmo, Mascota} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {ClienteAmoRepository} from './cliente-amo.repository';
import {MascotaRepository} from './mascota.repository';

export class AgendaRepository extends DefaultCrudRepository<
  Agenda,
  typeof Agenda.prototype.id,
  AgendaRelations
> {

  public readonly empleado: HasOneRepositoryFactory<Empleado, typeof Agenda.prototype.id>;

  public readonly clienteAmo: HasOneRepositoryFactory<ClienteAmo, typeof Agenda.prototype.id>;

  public readonly mascota: HasOneRepositoryFactory<Mascota, typeof Agenda.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ClienteAmoRepository') protected clienteAmoRepositoryGetter: Getter<ClienteAmoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Agenda, dataSource);
    this.mascota = this.createHasOneRepositoryFactoryFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.clienteAmo = this.createHasOneRepositoryFactoryFor('clienteAmo', clienteAmoRepositoryGetter);
    this.registerInclusionResolver('clienteAmo', this.clienteAmo.inclusionResolver);
    this.empleado = this.createHasOneRepositoryFactoryFor('empleado', empleadoRepositoryGetter);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
