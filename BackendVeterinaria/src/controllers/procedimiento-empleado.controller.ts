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
  Procedimiento,
  Empleado,
} from '../models';
import {ProcedimientoRepository} from '../repositories';

export class ProcedimientoEmpleadoController {
  constructor(
    @repository(ProcedimientoRepository) protected procedimientoRepository: ProcedimientoRepository,
  ) { }

  @get('/procedimientos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Procedimiento has one Empleado',
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
    return this.procedimientoRepository.empleado(id).get(filter);
  }

  @post('/procedimientos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Procedimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Procedimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInProcedimiento',
            exclude: ['id'],
            optional: ['procedimientoId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.procedimientoRepository.empleado(id).create(empleado);
  }

  @patch('/procedimientos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Procedimiento.Empleado PATCH success count',
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
    return this.procedimientoRepository.empleado(id).patch(empleado, where);
  }

  @del('/procedimientos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Procedimiento.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.procedimientoRepository.empleado(id).delete(where);
  }
}
