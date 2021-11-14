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
  Sucursal,
  Empleado,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalEmpleadoController {
  constructor(
    @repository(SucursalRepository) protected sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Sucursal has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.sucursalRepository.empleados(id).find(filter);
  }

  @post('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sucursal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sucursal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInSucursal',
            exclude: ['id'],
            optional: ['sucursalId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.sucursalRepository.empleados(id).create(empleado);
  }

  @patch('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sucursal.Empleado PATCH success count',
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
    return this.sucursalRepository.empleados(id).patch(empleado, where);
  }

  @del('/sucursals/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sucursal.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.sucursalRepository.empleados(id).delete(where);
  }
}
