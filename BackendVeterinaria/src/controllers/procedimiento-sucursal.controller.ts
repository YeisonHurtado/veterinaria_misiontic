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
  Sucursal,
} from '../models';
import {ProcedimientoRepository} from '../repositories';

export class ProcedimientoSucursalController {
  constructor(
    @repository(ProcedimientoRepository) protected procedimientoRepository: ProcedimientoRepository,
  ) { }

  @get('/procedimientos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Procedimiento has one Sucursal',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sucursal),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sucursal>,
  ): Promise<Sucursal> {
    return this.procedimientoRepository.sucursal(id).get(filter);
  }

  @post('/procedimientos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Procedimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Procedimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInProcedimiento',
            exclude: ['id'],
            optional: ['procedimientoId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'id'>,
  ): Promise<Sucursal> {
    return this.procedimientoRepository.sucursal(id).create(sucursal);
  }

  @patch('/procedimientos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Procedimiento.Sucursal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Partial<Sucursal>,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.procedimientoRepository.sucursal(id).patch(sucursal, where);
  }

  @del('/procedimientos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Procedimiento.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.procedimientoRepository.sucursal(id).delete(where);
  }
}
