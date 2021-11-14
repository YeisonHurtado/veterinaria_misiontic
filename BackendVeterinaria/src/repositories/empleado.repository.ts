import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Sucursal, Persona} from '../models';
import {PersonaRepository} from './persona.repository';
import {SucursalRepository} from './sucursal.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Empleado.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Empleado, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
  }
}
