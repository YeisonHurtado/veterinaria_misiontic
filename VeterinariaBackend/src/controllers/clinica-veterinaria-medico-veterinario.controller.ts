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
  MedicoVeterinario,
} from '../models';
import {ClinicaVeterinariaRepository} from '../repositories';

export class ClinicaVeterinariaMedicoVeterinarioController {
  constructor(
    @repository(ClinicaVeterinariaRepository) protected clinicaVeterinariaRepository: ClinicaVeterinariaRepository,
  ) { }

  @get('/clinica-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'Array of ClinicaVeterinaria has many MedicoVeterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MedicoVeterinario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MedicoVeterinario>,
  ): Promise<MedicoVeterinario[]> {
    return this.clinicaVeterinariaRepository.medicoVeterinarios(id).find(filter);
  }

  @post('/clinica-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedicoVeterinario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ClinicaVeterinaria.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {
            title: 'NewMedicoVeterinarioInClinicaVeterinaria',
            exclude: ['Id'],
            optional: ['clinicaVeterinariaId']
          }),
        },
      },
    }) medicoVeterinario: Omit<MedicoVeterinario, 'Id'>,
  ): Promise<MedicoVeterinario> {
    return this.clinicaVeterinariaRepository.medicoVeterinarios(id).create(medicoVeterinario);
  }

  @patch('/clinica-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria.MedicoVeterinario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: Partial<MedicoVeterinario>,
    @param.query.object('where', getWhereSchemaFor(MedicoVeterinario)) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.clinicaVeterinariaRepository.medicoVeterinarios(id).patch(medicoVeterinario, where);
  }

  @del('/clinica-veterinarias/{id}/medico-veterinarios', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria.MedicoVeterinario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MedicoVeterinario)) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.clinicaVeterinariaRepository.medicoVeterinarios(id).delete(where);
  }
}
