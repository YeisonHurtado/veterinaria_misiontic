import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Procedimiento,
  HistoriaClinicaMascota,
} from '../models';
import {ProcedimientoRepository} from '../repositories';

export class ProcedimientoHistoriaClinicaMascotaController {
  constructor(
    @repository(ProcedimientoRepository)
    public procedimientoRepository: ProcedimientoRepository,
  ) { }

  @get('/procedimientos/{id}/historia-clinica-mascota', {
    responses: {
      '200': {
        description: 'HistoriaClinicaMascota belonging to Procedimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaClinicaMascota)},
          },
        },
      },
    },
  })
  async getHistoriaClinicaMascota(
    @param.path.string('id') id: typeof Procedimiento.prototype.id,
  ): Promise<HistoriaClinicaMascota> {
    return this.procedimientoRepository.historiaClinicaMascota(id);
  }
}
