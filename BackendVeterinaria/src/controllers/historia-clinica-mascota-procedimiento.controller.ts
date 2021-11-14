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
  HistoriaClinicaMascota,
  Procedimiento,
} from '../models';
import {HistoriaClinicaMascotaRepository} from '../repositories';

export class HistoriaClinicaMascotaProcedimientoController {
  constructor(
    @repository(HistoriaClinicaMascotaRepository) protected historiaClinicaMascotaRepository: HistoriaClinicaMascotaRepository,
  ) { }

  @get('/historia-clinica-mascotas/{id}/procedimientos', {
    responses: {
      '200': {
        description: 'Array of HistoriaClinicaMascota has many Procedimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Procedimiento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Procedimiento>,
  ): Promise<Procedimiento[]> {
    return this.historiaClinicaMascotaRepository.procedimientos(id).find(filter);
  }

  @post('/historia-clinica-mascotas/{id}/procedimientos', {
    responses: {
      '200': {
        description: 'HistoriaClinicaMascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Procedimiento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof HistoriaClinicaMascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procedimiento, {
            title: 'NewProcedimientoInHistoriaClinicaMascota',
            exclude: ['id'],
            optional: ['historiaClinicaMascotaId']
          }),
        },
      },
    }) procedimiento: Omit<Procedimiento, 'id'>,
  ): Promise<Procedimiento> {
    return this.historiaClinicaMascotaRepository.procedimientos(id).create(procedimiento);
  }

  @patch('/historia-clinica-mascotas/{id}/procedimientos', {
    responses: {
      '200': {
        description: 'HistoriaClinicaMascota.Procedimiento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procedimiento, {partial: true}),
        },
      },
    })
    procedimiento: Partial<Procedimiento>,
    @param.query.object('where', getWhereSchemaFor(Procedimiento)) where?: Where<Procedimiento>,
  ): Promise<Count> {
    return this.historiaClinicaMascotaRepository.procedimientos(id).patch(procedimiento, where);
  }

  @del('/historia-clinica-mascotas/{id}/procedimientos', {
    responses: {
      '200': {
        description: 'HistoriaClinicaMascota.Procedimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Procedimiento)) where?: Where<Procedimiento>,
  ): Promise<Count> {
    return this.historiaClinicaMascotaRepository.procedimientos(id).delete(where);
  }
}
