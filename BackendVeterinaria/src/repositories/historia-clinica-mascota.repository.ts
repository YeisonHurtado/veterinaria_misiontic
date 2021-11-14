import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {HistoriaClinicaMascota, HistoriaClinicaMascotaRelations, Procedimiento} from '../models';
import {ProcedimientoRepository} from './procedimiento.repository';

export class HistoriaClinicaMascotaRepository extends DefaultCrudRepository<
  HistoriaClinicaMascota,
  typeof HistoriaClinicaMascota.prototype.id,
  HistoriaClinicaMascotaRelations
> {

  public readonly procedimientos: HasManyRepositoryFactory<Procedimiento, typeof HistoriaClinicaMascota.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('ProcedimientoRepository') protected procedimientoRepositoryGetter: Getter<ProcedimientoRepository>,
  ) {
    super(HistoriaClinicaMascota, dataSource);
    this.procedimientos = this.createHasManyRepositoryFactoryFor('procedimientos', procedimientoRepositoryGetter,);
    this.registerInclusionResolver('procedimientos', this.procedimientos.inclusionResolver);
  }
}
