import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Veterinaria, VeterinariaRelations, Sucursal} from '../models';
import {SucursalRepository} from './sucursal.repository';

export class VeterinariaRepository extends DefaultCrudRepository<
  Veterinaria,
  typeof Veterinaria.prototype.id,
  VeterinariaRelations
> {

  public readonly sucursales: HasManyRepositoryFactory<Sucursal, typeof Veterinaria.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Veterinaria, dataSource);
    this.sucursales = this.createHasManyRepositoryFactoryFor('sucursales', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursales', this.sucursales.inclusionResolver);
  }
}
