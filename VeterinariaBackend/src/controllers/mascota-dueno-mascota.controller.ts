import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  DuenoMascota,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaDuenoMascotaController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/dueno-mascota', {
    responses: {
      '200': {
        description: 'DuenoMascota belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DuenoMascota)},
          },
        },
      },
    },
  })
  async getDuenoMascota(
    @param.path.string('id') id: typeof Mascota.prototype.Id,
  ): Promise<DuenoMascota> {
    return this.mascotaRepository.duenoMascota(id);
  }
}
