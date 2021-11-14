import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Mascota, MascotaRelations, ClienteAmo} from '../models';
import {ClienteAmoRepository} from './cliente-amo.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly clienteAmo: BelongsToAccessor<ClienteAmo, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('ClienteAmoRepository') protected clienteAmoRepositoryGetter: Getter<ClienteAmoRepository>,
  ) {
    super(Mascota, dataSource);
    this.clienteAmo = this.createBelongsToAccessorFor('clienteAmo', clienteAmoRepositoryGetter,);
    this.registerInclusionResolver('clienteAmo', this.clienteAmo.inclusionResolver);
  }
}
