import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DuenoMascota, DuenoMascotaRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class DuenoMascotaRepository extends DefaultCrudRepository<
  DuenoMascota,
  typeof DuenoMascota.prototype.Id,
  DuenoMascotaRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof DuenoMascota.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(DuenoMascota, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
