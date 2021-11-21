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
import {AsistenteVeterinaria} from '../models';
import {AsistenteVeterinariaRepository} from '../repositories';

export class AsistenteVeterinariaController {
  constructor(
    @repository(AsistenteVeterinariaRepository)
    public asistenteVeterinariaRepository : AsistenteVeterinariaRepository,
  ) {}

  @post('/asistente-veterinarias')
  @response(200, {
    description: 'AsistenteVeterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsistenteVeterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {
            title: 'NewAsistenteVeterinaria',
            exclude: ['Id'],
          }),
        },
      },
    })
    asistenteVeterinaria: Omit<AsistenteVeterinaria, 'Id'>,
  ): Promise<AsistenteVeterinaria> {
    return this.asistenteVeterinariaRepository.create(asistenteVeterinaria);
  }

  @get('/asistente-veterinarias/count')
  @response(200, {
    description: 'AsistenteVeterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsistenteVeterinaria) where?: Where<AsistenteVeterinaria>,
  ): Promise<Count> {
    return this.asistenteVeterinariaRepository.count(where);
  }

  @get('/asistente-veterinarias')
  @response(200, {
    description: 'Array of AsistenteVeterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsistenteVeterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsistenteVeterinaria) filter?: Filter<AsistenteVeterinaria>,
  ): Promise<AsistenteVeterinaria[]> {
    return this.asistenteVeterinariaRepository.find(filter);
  }

  @patch('/asistente-veterinarias')
  @response(200, {
    description: 'AsistenteVeterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {partial: true}),
        },
      },
    })
    asistenteVeterinaria: AsistenteVeterinaria,
    @param.where(AsistenteVeterinaria) where?: Where<AsistenteVeterinaria>,
  ): Promise<Count> {
    return this.asistenteVeterinariaRepository.updateAll(asistenteVeterinaria, where);
  }

  @get('/asistente-veterinarias/{id}')
  @response(200, {
    description: 'AsistenteVeterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsistenteVeterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AsistenteVeterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<AsistenteVeterinaria>
  ): Promise<AsistenteVeterinaria> {
    return this.asistenteVeterinariaRepository.findById(id, filter);
  }

  @patch('/asistente-veterinarias/{id}')
  @response(204, {
    description: 'AsistenteVeterinaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {partial: true}),
        },
      },
    })
    asistenteVeterinaria: AsistenteVeterinaria,
  ): Promise<void> {
    await this.asistenteVeterinariaRepository.updateById(id, asistenteVeterinaria);
  }

  @put('/asistente-veterinarias/{id}')
  @response(204, {
    description: 'AsistenteVeterinaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asistenteVeterinaria: AsistenteVeterinaria,
  ): Promise<void> {
    await this.asistenteVeterinariaRepository.replaceById(id, asistenteVeterinaria);
  }

  @del('/asistente-veterinarias/{id}')
  @response(204, {
    description: 'AsistenteVeterinaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asistenteVeterinariaRepository.deleteById(id);
  }
}
