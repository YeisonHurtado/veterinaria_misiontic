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
  Mascota,
} from '../models';
import {ProcedimientoRepository} from '../repositories';

export class ProcedimientoMascotaController {
  constructor(
    @repository(ProcedimientoRepository) protected procedimientoRepository: ProcedimientoRepository,
  ) { }

  @get('/procedimientos/{id}/mascota', {
    responses: {
      '200': {
        description: 'Procedimiento has one Mascota',
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
    return this.procedimientoRepository.mascota(id).get(filter);
  }

  @post('/procedimientos/{id}/mascota', {
    responses: {
      '200': {
        description: 'Procedimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Procedimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInProcedimiento',
            exclude: ['id'],
            optional: ['procedimientoId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.procedimientoRepository.mascota(id).create(mascota);
  }

  @patch('/procedimientos/{id}/mascota', {
    responses: {
      '200': {
        description: 'Procedimiento.Mascota PATCH success count',
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
    return this.procedimientoRepository.mascota(id).patch(mascota, where);
  }

  @del('/procedimientos/{id}/mascota', {
    responses: {
      '200': {
        description: 'Procedimiento.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.procedimientoRepository.mascota(id).delete(where);
  }
}
