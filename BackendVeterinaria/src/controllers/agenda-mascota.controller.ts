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
  Mascota,
} from '../models';
import {AgendaRepository} from '../repositories';

export class AgendaMascotaController {
  constructor(
    @repository(AgendaRepository) protected agendaRepository: AgendaRepository,
  ) { }

  @get('/agenda/{id}/mascota', {
    responses: {
      '200': {
        description: 'Agenda has one Mascota',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mascota),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota> {
    return this.agendaRepository.mascota(id).get(filter);
  }

  @post('/agenda/{id}/mascota', {
    responses: {
      '200': {
        description: 'Agenda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Agenda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInAgenda',
            exclude: ['id'],
            optional: ['agendaId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.agendaRepository.mascota(id).create(mascota);
  }

  @patch('/agenda/{id}/mascota', {
    responses: {
      '200': {
        description: 'Agenda.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.agendaRepository.mascota(id).patch(mascota, where);
  }

  @del('/agenda/{id}/mascota', {
    responses: {
      '200': {
        description: 'Agenda.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.agendaRepository.mascota(id).delete(where);
  }
}
