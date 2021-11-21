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
  ClinicaVeterinaria,
  AsistenteVeterinaria,
} from '../models';
import {ClinicaVeterinariaRepository} from '../repositories';

export class ClinicaVeterinariaAsistenteVeterinariaController {
  constructor(
    @repository(ClinicaVeterinariaRepository) protected clinicaVeterinariaRepository: ClinicaVeterinariaRepository,
  ) { }

  @get('/clinica-veterinarias/{id}/asistente-veterinarias', {
    responses: {
      '200': {
        description: 'Array of ClinicaVeterinaria has many AsistenteVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AsistenteVeterinaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AsistenteVeterinaria>,
  ): Promise<AsistenteVeterinaria[]> {
    return this.clinicaVeterinariaRepository.asistenteVeterinarias(id).find(filter);
  }

  @post('/clinica-veterinarias/{id}/asistente-veterinarias', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsistenteVeterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ClinicaVeterinaria.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {
            title: 'NewAsistenteVeterinariaInClinicaVeterinaria',
            exclude: ['Id'],
            optional: ['clinicaVeterinariaId']
          }),
        },
      },
    }) asistenteVeterinaria: Omit<AsistenteVeterinaria, 'Id'>,
  ): Promise<AsistenteVeterinaria> {
    return this.clinicaVeterinariaRepository.asistenteVeterinarias(id).create(asistenteVeterinaria);
  }

  @patch('/clinica-veterinarias/{id}/asistente-veterinarias', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria.AsistenteVeterinaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {partial: true}),
        },
      },
    })
    asistenteVeterinaria: Partial<AsistenteVeterinaria>,
    @param.query.object('where', getWhereSchemaFor(AsistenteVeterinaria)) where?: Where<AsistenteVeterinaria>,
  ): Promise<Count> {
    return this.clinicaVeterinariaRepository.asistenteVeterinarias(id).patch(asistenteVeterinaria, where);
  }

  @del('/clinica-veterinarias/{id}/asistente-veterinarias', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria.AsistenteVeterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AsistenteVeterinaria)) where?: Where<AsistenteVeterinaria>,
  ): Promise<Count> {
    return this.clinicaVeterinariaRepository.asistenteVeterinarias(id).delete(where);
  }
}
