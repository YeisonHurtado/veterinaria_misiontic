import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Procedimiento, ProcedimientoRelations, HistoriaClinicaMascota, Empleado, Mascota, Sucursal} from '../models';
import {HistoriaClinicaMascotaRepository} from './historia-clinica-mascota.repository';
import {EmpleadoRepository} from './empleado.repository';
import {MascotaRepository} from './mascota.repository';
import {SucursalRepository} from './sucursal.repository';

export class ProcedimientoRepository extends DefaultCrudRepository<
  Procedimiento,
  typeof Procedimiento.prototype.id,
  ProcedimientoRelations
> {

  public readonly historiaClinicaMascota: BelongsToAccessor<HistoriaClinicaMascota, typeof Procedimiento.prototype.id>;

  public readonly empleado: HasOneRepositoryFactory<Empleado, typeof Procedimiento.prototype.id>;

  public readonly mascota: HasOneRepositoryFactory<Mascota, typeof Procedimiento.prototype.id>;

  public readonly sucursal: HasOneRepositoryFactory<Sucursal, typeof Procedimiento.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('HistoriaClinicaMascotaRepository') protected historiaClinicaMascotaRepositoryGetter: Getter<HistoriaClinicaMascotaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Procedimiento, dataSource);
    this.sucursal = this.createHasOneRepositoryFactoryFor('sucursal', sucursalRepositoryGetter);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.mascota = this.createHasOneRepositoryFactoryFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.empleado = this.createHasOneRepositoryFactoryFor('empleado', empleadoRepositoryGetter);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.historiaClinicaMascota = this.createBelongsToAccessorFor('historiaClinicaMascota', historiaClinicaMascotaRepositoryGetter,);
    this.registerInclusionResolver('historiaClinicaMascota', this.historiaClinicaMascota.inclusionResolver);
  }
}
