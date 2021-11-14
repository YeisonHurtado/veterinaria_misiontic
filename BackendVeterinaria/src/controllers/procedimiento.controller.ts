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
import {Procedimiento} from '../models';
import {ProcedimientoRepository} from '../repositories';

export class ProcedimientoController {
  constructor(
    @repository(ProcedimientoRepository)
    public procedimientoRepository : ProcedimientoRepository,
  ) {}

  @post('/procedimientos')
  @response(200, {
    description: 'Procedimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Procedimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procedimiento, {
            title: 'NewProcedimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    procedimiento: Omit<Procedimiento, 'id'>,
  ): Promise<Procedimiento> {
    return this.procedimientoRepository.create(procedimiento);
  }

  @get('/procedimientos/count')
  @response(200, {
    description: 'Procedimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Procedimiento) where?: Where<Procedimiento>,
  ): Promise<Count> {
    return this.procedimientoRepository.count(where);
  }

  @get('/procedimientos')
  @response(200, {
    description: 'Array of Procedimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Procedimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Procedimiento) filter?: Filter<Procedimiento>,
  ): Promise<Procedimiento[]> {
    return this.procedimientoRepository.find(filter);
  }

  @patch('/procedimientos')
  @response(200, {
    description: 'Procedimiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procedimiento, {partial: true}),
        },
      },
    })
    procedimiento: Procedimiento,
    @param.where(Procedimiento) where?: Where<Procedimiento>,
  ): Promise<Count> {
    return this.procedimientoRepository.updateAll(procedimiento, where);
  }

  @get('/procedimientos/{id}')
  @response(200, {
    description: 'Procedimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Procedimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Procedimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Procedimiento>
  ): Promise<Procedimiento> {
    return this.procedimientoRepository.findById(id, filter);
  }

  @patch('/procedimientos/{id}')
  @response(204, {
    description: 'Procedimiento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procedimiento, {partial: true}),
        },
      },
    })
    procedimiento: Procedimiento,
  ): Promise<void> {
    await this.procedimientoRepository.updateById(id, procedimiento);
  }

  @put('/procedimientos/{id}')
  @response(204, {
    description: 'Procedimiento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() procedimiento: Procedimiento,
  ): Promise<void> {
    await this.procedimientoRepository.replaceById(id, procedimiento);
  }

  @del('/procedimientos/{id}')
  @response(204, {
    description: 'Procedimiento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.procedimientoRepository.deleteById(id);
  }
}
