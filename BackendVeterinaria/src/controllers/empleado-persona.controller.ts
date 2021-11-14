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
  Empleado,
  Persona,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoPersonaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/persona', {
    responses: {
      '200': {
        description: 'Empleado has one Persona',
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
    return this.empleadoRepository.persona(id).get(filter);
  }

  @post('/empleados/{id}/persona', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.empleadoRepository.persona(id).create(persona);
  }

  @patch('/empleados/{id}/persona', {
    responses: {
      '200': {
        description: 'Empleado.Persona PATCH success count',
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
    return this.empleadoRepository.persona(id).patch(persona, where);
  }

  @del('/empleados/{id}/persona', {
    responses: {
      '200': {
        description: 'Empleado.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.empleadoRepository.persona(id).delete(where);
  }
}
