import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CitaMedica, CitaMedicaRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class CitaMedicaRepository extends DefaultCrudRepository<
  CitaMedica,
  typeof CitaMedica.prototype.Id,
  CitaMedicaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof CitaMedica.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(CitaMedica, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
