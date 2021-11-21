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
import {CitaMedica} from '../models';
import {CitaMedicaRepository} from '../repositories';

export class CitaMedicaController {
  constructor(
    @repository(CitaMedicaRepository)
    public citaMedicaRepository : CitaMedicaRepository,
  ) {}

  @post('/cita-medicas')
  @response(200, {
    description: 'CitaMedica model instance',
    content: {'application/json': {schema: getModelSchemaRef(CitaMedica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CitaMedica, {
            title: 'NewCitaMedica',
            exclude: ['Id'],
          }),
        },
      },
    })
    citaMedica: Omit<CitaMedica, 'Id'>,
  ): Promise<CitaMedica> {
    return this.citaMedicaRepository.create(citaMedica);
  }

  @get('/cita-medicas/count')
  @response(200, {
    description: 'CitaMedica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CitaMedica) where?: Where<CitaMedica>,
  ): Promise<Count> {
    return this.citaMedicaRepository.count(where);
  }

  @get('/cita-medicas')
  @response(200, {
    description: 'Array of CitaMedica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CitaMedica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CitaMedica) filter?: Filter<CitaMedica>,
  ): Promise<CitaMedica[]> {
    return this.citaMedicaRepository.find(filter);
  }

  @patch('/cita-medicas')
  @response(200, {
    description: 'CitaMedica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CitaMedica, {partial: true}),
        },
      },
    })
    citaMedica: CitaMedica,
    @param.where(CitaMedica) where?: Where<CitaMedica>,
  ): Promise<Count> {
    return this.citaMedicaRepository.updateAll(citaMedica, where);
  }

  @get('/cita-medicas/{id}')
  @response(200, {
    description: 'CitaMedica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CitaMedica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CitaMedica, {exclude: 'where'}) filter?: FilterExcludingWhere<CitaMedica>
  ): Promise<CitaMedica> {
    return this.citaMedicaRepository.findById(id, filter);
  }

  @patch('/cita-medicas/{id}')
  @response(204, {
    description: 'CitaMedica PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CitaMedica, {partial: true}),
        },
      },
    })
    citaMedica: CitaMedica,
  ): Promise<void> {
    await this.citaMedicaRepository.updateById(id, citaMedica);
  }

  @put('/cita-medicas/{id}')
  @response(204, {
    description: 'CitaMedica PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() citaMedica: CitaMedica,
  ): Promise<void> {
    await this.citaMedicaRepository.replaceById(id, citaMedica);
  }

  @del('/cita-medicas/{id}')
  @response(204, {
    description: 'CitaMedica DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.citaMedicaRepository.deleteById(id);
  }
}
