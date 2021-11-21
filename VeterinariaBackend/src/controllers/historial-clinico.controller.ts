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
import {HistorialClinico} from '../models';
import {HistorialClinicoRepository} from '../repositories';

export class HistorialClinicoController {
  constructor(
    @repository(HistorialClinicoRepository)
    public historialClinicoRepository : HistorialClinicoRepository,
  ) {}

  @post('/historial-clinicos')
  @response(200, {
    description: 'HistorialClinico model instance',
    content: {'application/json': {schema: getModelSchemaRef(HistorialClinico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialClinico, {
            title: 'NewHistorialClinico',
            exclude: ['Id'],
          }),
        },
      },
    })
    historialClinico: Omit<HistorialClinico, 'Id'>,
  ): Promise<HistorialClinico> {
    return this.historialClinicoRepository.create(historialClinico);
  }

  @get('/historial-clinicos/count')
  @response(200, {
    description: 'HistorialClinico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HistorialClinico) where?: Where<HistorialClinico>,
  ): Promise<Count> {
    return this.historialClinicoRepository.count(where);
  }

  @get('/historial-clinicos')
  @response(200, {
    description: 'Array of HistorialClinico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HistorialClinico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HistorialClinico) filter?: Filter<HistorialClinico>,
  ): Promise<HistorialClinico[]> {
    return this.historialClinicoRepository.find(filter);
  }

  @patch('/historial-clinicos')
  @response(200, {
    description: 'HistorialClinico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialClinico, {partial: true}),
        },
      },
    })
    historialClinico: HistorialClinico,
    @param.where(HistorialClinico) where?: Where<HistorialClinico>,
  ): Promise<Count> {
    return this.historialClinicoRepository.updateAll(historialClinico, where);
  }

  @get('/historial-clinicos/{id}')
  @response(200, {
    description: 'HistorialClinico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HistorialClinico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(HistorialClinico, {exclude: 'where'}) filter?: FilterExcludingWhere<HistorialClinico>
  ): Promise<HistorialClinico> {
    return this.historialClinicoRepository.findById(id, filter);
  }

  @patch('/historial-clinicos/{id}')
  @response(204, {
    description: 'HistorialClinico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistorialClinico, {partial: true}),
        },
      },
    })
    historialClinico: HistorialClinico,
  ): Promise<void> {
    await this.historialClinicoRepository.updateById(id, historialClinico);
  }

  @put('/historial-clinicos/{id}')
  @response(204, {
    description: 'HistorialClinico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historialClinico: HistorialClinico,
  ): Promise<void> {
    await this.historialClinicoRepository.replaceById(id, historialClinico);
  }

  @del('/historial-clinicos/{id}')
  @response(204, {
    description: 'HistorialClinico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historialClinicoRepository.deleteById(id);
  }
}
