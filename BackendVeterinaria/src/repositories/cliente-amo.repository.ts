import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ClienteAmo, ClienteAmoRelations, Mascota, Persona} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PersonaRepository} from './persona.repository';

export class ClienteAmoRepository extends DefaultCrudRepository<
  ClienteAmo,
  typeof ClienteAmo.prototype.id,
  ClienteAmoRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof ClienteAmo.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof ClienteAmo.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(ClienteAmo, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
