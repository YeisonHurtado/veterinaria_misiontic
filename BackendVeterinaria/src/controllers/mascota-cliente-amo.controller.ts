import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  ClienteAmo,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaClienteAmoController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/cliente-amo', {
    responses: {
      '200': {
        description: 'ClienteAmo belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClienteAmo)},
          },
        },
      },
    },
  })
  async getClienteAmo(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<ClienteAmo> {
    return this.mascotaRepository.clienteAmo(id);
  }
}
