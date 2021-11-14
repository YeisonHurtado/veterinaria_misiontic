import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Persona, Sucursal} from '../models';
import {PersonaRepository} from './persona.repository';
import {SucursalRepository} from './sucursal.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Empleado.prototype.id>;

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Empleado, dataSource);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
