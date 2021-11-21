import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AsistenteVeterinaria,
  ClinicaVeterinaria,
} from '../models';
import {AsistenteVeterinariaRepository} from '../repositories';

export class AsistenteVeterinariaClinicaVeterinariaController {
  constructor(
    @repository(AsistenteVeterinariaRepository)
    public asistenteVeterinariaRepository: AsistenteVeterinariaRepository,
  ) { }

  @get('/asistente-veterinarias/{id}/clinica-veterinaria', {
    responses: {
      '200': {
        description: 'ClinicaVeterinaria belonging to AsistenteVeterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClinicaVeterinaria)},
          },
        },
      },
    },
  })
  async getClinicaVeterinaria(
    @param.path.string('id') id: typeof AsistenteVeterinaria.prototype.Id,
  ): Promise<ClinicaVeterinaria> {
    return this.asistenteVeterinariaRepository.clinicaVeterinaria(id);
  }
}
