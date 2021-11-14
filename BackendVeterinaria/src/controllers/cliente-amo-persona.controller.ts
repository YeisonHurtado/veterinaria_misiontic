import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ClienteAmo,
  Persona,
} from '../models';
import {ClienteAmoRepository} from '../repositories';

export class ClienteAmoPersonaController {
  constructor(
    @repository(ClienteAmoRepository) protected clienteAmoRepository: ClienteAmoRepository,
  ) { }

  @get('/cliente-amos/{id}/persona', {
    responses: {
      '200': {
        description: 'ClienteAmo has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.clienteAmoRepository.persona(id).get(filter);
  }

  @post('/cliente-amos/{id}/persona', {
    responses: {
      '200': {
        description: 'ClienteAmo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ClienteAmo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInClienteAmo',
            exclude: ['id'],
            optional: ['clienteAmoId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.clienteAmoRepository.persona(id).create(persona);
  }

  @patch('/cliente-amos/{id}/persona', {
    responses: {
      '200': {
        description: 'ClienteAmo.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.clienteAmoRepository.persona(id).patch(persona, where);
  }

  @del('/cliente-amos/{id}/persona', {
    responses: {
      '200': {
        description: 'ClienteAmo.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.clienteAmoRepository.persona(id).delete(where);
  }
}
