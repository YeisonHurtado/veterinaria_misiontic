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
  Agenda,
  ClienteAmo,
} from '../models';
import {AgendaRepository} from '../repositories';

export class AgendaClienteAmoController {
  constructor(
    @repository(AgendaRepository) protected agendaRepository: AgendaRepository,
  ) { }

  @get('/agenda/{id}/cliente-amo', {
    responses: {
      '200': {
        description: 'Agenda has one ClienteAmo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ClienteAmo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ClienteAmo>,
  ): Promise<ClienteAmo> {
    return this.agendaRepository.clienteAmo(id).get(filter);
  }

  @post('/agenda/{id}/cliente-amo', {
    responses: {
      '200': {
        description: 'Agenda model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClienteAmo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Agenda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteAmo, {
            title: 'NewClienteAmoInAgenda',
            exclude: ['id'],
            optional: ['agendaId']
          }),
        },
      },
    }) clienteAmo: Omit<ClienteAmo, 'id'>,
  ): Promise<ClienteAmo> {
    return this.agendaRepository.clienteAmo(id).create(clienteAmo);
  }

  @patch('/agenda/{id}/cliente-amo', {
    responses: {
      '200': {
        description: 'Agenda.ClienteAmo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteAmo, {partial: true}),
        },
      },
    })
    clienteAmo: Partial<ClienteAmo>,
    @param.query.object('where', getWhereSchemaFor(ClienteAmo)) where?: Where<ClienteAmo>,
  ): Promise<Count> {
    return this.agendaRepository.clienteAmo(id).patch(clienteAmo, where);
  }

  @del('/agenda/{id}/cliente-amo', {
    responses: {
      '200': {
        description: 'Agenda.ClienteAmo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ClienteAmo)) where?: Where<ClienteAmo>,
  ): Promise<Count> {
    return this.agendaRepository.clienteAmo(id).delete(where);
  }
}
