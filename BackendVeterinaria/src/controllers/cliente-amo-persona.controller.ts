import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ClienteAmo,
  Persona,
} from '../models';
import {ClienteAmoRepository} from '../repositories';

export class ClienteAmoPersonaController {
  constructor(
    @repository(ClienteAmoRepository)
    public clienteAmoRepository: ClienteAmoRepository,
  ) { }

  @get('/cliente-amos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to ClienteAmo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof ClienteAmo.prototype.id,
  ): Promise<Persona> {
    return this.clienteAmoRepository.persona(id);
  }
}
