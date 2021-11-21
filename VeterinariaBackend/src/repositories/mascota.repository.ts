import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, DuenoMascota} from '../models';
import {DuenoMascotaRepository} from './dueno-mascota.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.Id,
  MascotaRelations
> {

  public readonly duenoMascota: BelongsToAccessor<DuenoMascota, typeof Mascota.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DuenoMascotaRepository') protected duenoMascotaRepositoryGetter: Getter<DuenoMascotaRepository>,
  ) {
    super(Mascota, dataSource);
    this.duenoMascota = this.createBelongsToAccessorFor('duenoMascota', duenoMascotaRepositoryGetter,);
    this.registerInclusionResolver('duenoMascota', this.duenoMascota.inclusionResolver);
  }
}
