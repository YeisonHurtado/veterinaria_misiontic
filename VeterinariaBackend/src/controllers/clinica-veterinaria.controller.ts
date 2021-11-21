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
import {ClinicaVeterinaria} from '../models';
import {ClinicaVeterinariaRepository} from '../repositories';

export class ClinicaVeterinariaController {
  constructor(
    @repository(ClinicaVeterinariaRepository)
    public clinicaVeterinariaRepository : ClinicaVeterinariaRepository,
  ) {}

  @post('/clinica-veterinarias')
  @response(200, {
    description: 'ClinicaVeterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClinicaVeterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClinicaVeterinaria, {
            title: 'NewClinicaVeterinaria',
            exclude: ['Id'],
          }),
        },
      },
    })
    clinicaVeterinaria: Omit<ClinicaVeterinaria, 'Id'>,
  ): Promise<ClinicaVeterinaria> {
    return this.clinicaVeterinariaRepository.create(clinicaVeterinaria);
  }

  @get('/clinica-veterinarias/count')
  @response(200, {
    description: 'ClinicaVeterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClinicaVeterinaria) where?: Where<ClinicaVeterinaria>,
  ): Promise<Count> {
    return this.clinicaVeterinariaRepository.count(where);
  }

  @get('/clinica-veterinarias')
  @response(200, {
    description: 'Array of ClinicaVeterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClinicaVeterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClinicaVeterinaria) filter?: Filter<ClinicaVeterinaria>,
  ): Promise<ClinicaVeterinaria[]> {
    return this.clinicaVeterinariaRepository.find(filter);
  }

  @patch('/clinica-veterinarias')
  @response(200, {
    description: 'ClinicaVeterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClinicaVeterinaria, {partial: true}),
        },
      },
    })
    clinicaVeterinaria: ClinicaVeterinaria,
    @param.where(ClinicaVeterinaria) where?: Where<ClinicaVeterinaria>,
  ): Promise<Count> {
    return this.clinicaVeterinariaRepository.updateAll(clinicaVeterinaria, where);
  }

  @get('/clinica-veterinarias/{id}')
  @response(200, {
    description: 'ClinicaVeterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClinicaVeterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ClinicaVeterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<ClinicaVeterinaria>
  ): Promise<ClinicaVeterinaria> {
    return this.clinicaVeterinariaRepository.findById(id, filter);
  }

  @patch('/clinica-veterinarias/{id}')
  @response(204, {
    description: 'ClinicaVeterinaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClinicaVeterinaria, {partial: true}),
        },
      },
    })
    clinicaVeterinaria: ClinicaVeterinaria,
  ): Promise<void> {
    await this.clinicaVeterinariaRepository.updateById(id, clinicaVeterinaria);
  }

  @put('/clinica-veterinarias/{id}')
  @response(204, {
    description: 'ClinicaVeterinaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clinicaVeterinaria: ClinicaVeterinaria,
  ): Promise<void> {
    await this.clinicaVeterinariaRepository.replaceById(id, clinicaVeterinaria);
  }

  @del('/clinica-veterinarias/{id}')
  @response(204, {
    description: 'ClinicaVeterinaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clinicaVeterinariaRepository.deleteById(id);
  }
}
