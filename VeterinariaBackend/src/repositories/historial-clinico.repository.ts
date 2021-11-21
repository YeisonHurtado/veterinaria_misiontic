import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {HistorialClinico, HistorialClinicoRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class HistorialClinicoRepository extends DefaultCrudRepository<
  HistorialClinico,
  typeof HistorialClinico.prototype.Id,
  HistorialClinicoRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof HistorialClinico.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(HistorialClinico, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
