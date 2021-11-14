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
  Empleado,
} from '../models';
import {AgendaRepository} from '../repositories';

export class AgendaEmpleadoController {
  constructor(
    @repository(AgendaRepository) protected agendaRepository: AgendaRepository,
  ) { }

  @get('/agenda/{id}/empleado', {
    responses: {
      '200': {
        description: 'Agenda has one Empleado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Empleado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado> {
    return this.agendaRepository.empleado(id).get(filter);
  }

  @post('/agenda/{id}/empleado', {
    responses: {
      '200': {
        description: 'Agenda model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Agenda.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInAgenda',
            exclude: ['id'],
            optional: ['agendaId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.agendaRepository.empleado(id).create(empleado);
  }

  @patch('/agenda/{id}/empleado', {
    responses: {
      '200': {
        description: 'Agenda.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.agendaRepository.empleado(id).patch(empleado, where);
  }

  @del('/agenda/{id}/empleado', {
    responses: {
      '200': {
        description: 'Agenda.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.agendaRepository.empleado(id).delete(where);
  }
}
