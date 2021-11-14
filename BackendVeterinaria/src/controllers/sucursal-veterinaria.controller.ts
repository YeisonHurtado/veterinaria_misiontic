import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sucursal,
  Veterinaria,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalVeterinariaController {
  constructor(
    @repository(SucursalRepository)
    public sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/veterinaria', {
    responses: {
      '200': {
        description: 'Veterinaria belonging to Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinaria)},
          },
        },
      },
    },
  })
  async getVeterinaria(
    @param.path.string('id') id: typeof Sucursal.prototype.id,
  ): Promise<Veterinaria> {
    return this.sucursalRepository.veterinaria(id);
  }
}
