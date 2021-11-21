import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MedicoVeterinario,
  ClinicaVeterinaria,
} from '../models';
import {MedicoVeterinarioRepository} from '../repositories';

export class MedicoVeterinarioClinicaVeterinariaController {
  constructor(
    @repository(MedicoVeterinarioRepository)
    public medicoVeterinarioRepository: MedicoVeterinarioRepository,
  ) { }

  @get('/medico-veterinarios/{id}/clinica-veterinaria', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria belonging to MedicoVeterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClinicaVeterinaria)},
          },
        },
      },
    },
  })
  async getClinicaVeterinaria(
    @param.path.string('id') id: typeof MedicoVeterinario.prototype.Id,
  ): Promise<ClinicaVeterinaria> {
    return this.medicoVeterinarioRepository.clinicaVeterinaria(id);
  }
}
