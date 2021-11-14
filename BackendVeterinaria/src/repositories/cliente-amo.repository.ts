import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ClienteAmo, ClienteAmoRelations, Persona, Mascota} from '../models';
import {PersonaRepository} from './persona.repository';
import {MascotaRepository} from './mascota.repository';

export class ClienteAmoRepository extends DefaultCrudRepository<
  ClienteAmo,
  typeof ClienteAmo.prototype.id,
  ClienteAmoRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof ClienteAmo.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof ClienteAmo.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(ClienteAmo, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
