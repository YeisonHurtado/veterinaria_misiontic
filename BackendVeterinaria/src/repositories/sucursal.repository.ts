import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Veterinaria, Empleado} from '../models';
import {VeterinariaRepository} from './veterinaria.repository';
import {EmpleadoRepository} from './empleado.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.id,
  SucursalRelations
> {

  public readonly veterinaria: BelongsToAccessor<Veterinaria, typeof Sucursal.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Sucursal.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('VeterinariaRepository') protected veterinariaRepositoryGetter: Getter<VeterinariaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Sucursal, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.veterinaria = this.createBelongsToAccessorFor('veterinaria', veterinariaRepositoryGetter,);
    this.registerInclusionResolver('veterinaria', this.veterinaria.inclusionResolver);
  }
}
