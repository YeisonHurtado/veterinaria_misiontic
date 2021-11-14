import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {HistoriaClinicaMascota} from '../models';
import {HistoriaClinicaMascotaRepository} from '../repositories';

export class HistoriaClinicaController {
  constructor(
    @repository(HistoriaClinicaMascotaRepository)
    public historiaClinicaMascotaRepository : HistoriaClinicaMascotaRepository,
  ) {}

  @post('/historia-clinica-mascotas')
  @response(200, {
    description: 'HistoriaClinicaMascota model instance',
    content: {'application/json': {schema: getModelSchemaRef(HistoriaClinicaMascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinicaMascota, {
            title: 'NewHistoriaClinicaMascota',
            exclude: ['id'],
          }),
        },
      },
    })
    historiaClinicaMascota: Omit<HistoriaClinicaMascota, 'id'>,
  ): Promise<HistoriaClinicaMascota> {
    return this.historiaClinicaMascotaRepository.create(historiaClinicaMascota);
  }

  @get('/historia-clinica-mascotas/count')
  @response(200, {
    description: 'HistoriaClinicaMascota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HistoriaClinicaMascota) where?: Where<HistoriaClinicaMascota>,
  ): Promise<Count> {
    return this.historiaClinicaMascotaRepository.count(where);
  }

  @get('/historia-clinica-mascotas')
  @response(200, {
    description: 'Array of HistoriaClinicaMascota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HistoriaClinicaMascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HistoriaClinicaMascota) filter?: Filter<HistoriaClinicaMascota>,
  ): Promise<HistoriaClinicaMascota[]> {
    return this.historiaClinicaMascotaRepository.find(filter);
  }

  @patch('/historia-clinica-mascotas')
  @response(200, {
    description: 'HistoriaClinicaMascota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinicaMascota, {partial: true}),
        },
      },
    })
    historiaClinicaMascota: HistoriaClinicaMascota,
    @param.where(HistoriaClinicaMascota) where?: Where<HistoriaClinicaMascota>,
  ): Promise<Count> {
    return this.historiaClinicaMascotaRepository.updateAll(historiaClinicaMascota, where);
  }

  @get('/historia-clinica-mascotas/{id}')
  @response(200, {
    description: 'HistoriaClinicaMascota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HistoriaClinicaMascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HistoriaClinicaMascota, {exclude: 'where'}) filter?: FilterExcludingWhere<HistoriaClinicaMascota>
  ): Promise<HistoriaClinicaMascota> {
    return this.historiaClinicaMascotaRepository.findById(id, filter);
  }

  @patch('/historia-clinica-mascotas/{id}')
  @response(204, {
    description: 'HistoriaClinicaMascota PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaClinicaMascota, {partial: true}),
        },
      },
    })
    historiaClinicaMascota: HistoriaClinicaMascota,
  ): Promise<void> {
    await this.historiaClinicaMascotaRepository.updateById(id, historiaClinicaMascota);
  }

  @put('/historia-clinica-mascotas/{id}')
  @response(204, {
    description: 'HistoriaClinicaMascota PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historiaClinicaMascota: HistoriaClinicaMascota,
  ): Promise<void> {
    await this.historiaClinicaMascotaRepository.replaceById(id, historiaClinicaMascota);
  }

  @del('/historia-clinica-mascotas/{id}')
  @response(204, {
    description: 'HistoriaClinicaMascota DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historiaClinicaMascotaRepository.deleteById(id);
  }
}
