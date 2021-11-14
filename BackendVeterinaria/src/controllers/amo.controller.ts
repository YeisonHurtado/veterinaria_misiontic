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
import {ClienteAmo} from '../models';
import {ClienteAmoRepository} from '../repositories';

export class AmoController {
  constructor(
    @repository(ClienteAmoRepository)
    public clienteAmoRepository : ClienteAmoRepository,
  ) {}

  @post('/cliente-amos')
  @response(200, {
    description: 'ClienteAmo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClienteAmo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteAmo, {
            title: 'NewClienteAmo',
            exclude: ['id'],
          }),
        },
      },
    })
    clienteAmo: Omit<ClienteAmo, 'id'>,
  ): Promise<ClienteAmo> {
    return this.clienteAmoRepository.create(clienteAmo);
  }

  @get('/cliente-amos/count')
  @response(200, {
    description: 'ClienteAmo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClienteAmo) where?: Where<ClienteAmo>,
  ): Promise<Count> {
    return this.clienteAmoRepository.count(where);
  }

  @get('/cliente-amos')
  @response(200, {
    description: 'Array of ClienteAmo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClienteAmo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClienteAmo) filter?: Filter<ClienteAmo>,
  ): Promise<ClienteAmo[]> {
    return this.clienteAmoRepository.find(filter);
  }

  @patch('/cliente-amos')
  @response(200, {
    description: 'ClienteAmo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteAmo, {partial: true}),
        },
      },
    })
    clienteAmo: ClienteAmo,
    @param.where(ClienteAmo) where?: Where<ClienteAmo>,
  ): Promise<Count> {
    return this.clienteAmoRepository.updateAll(clienteAmo, where);
  }

  @get('/cliente-amos/{id}')
  @response(200, {
    description: 'ClienteAmo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClienteAmo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ClienteAmo, {exclude: 'where'}) filter?: FilterExcludingWhere<ClienteAmo>
  ): Promise<ClienteAmo> {
    return this.clienteAmoRepository.findById(id, filter);
  }

  @patch('/cliente-amos/{id}')
  @response(204, {
    description: 'ClienteAmo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteAmo, {partial: true}),
        },
      },
    })
    clienteAmo: ClienteAmo,
  ): Promise<void> {
    await this.clienteAmoRepository.updateById(id, clienteAmo);
  }

  @put('/cliente-amos/{id}')
  @response(204, {
    description: 'ClienteAmo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clienteAmo: ClienteAmo,
  ): Promise<void> {
    await this.clienteAmoRepository.replaceById(id, clienteAmo);
  }

  @del('/cliente-amos/{id}')
  @response(204, {
    description: 'ClienteAmo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteAmoRepository.deleteById(id);
  }
}
