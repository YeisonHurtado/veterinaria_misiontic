import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Sucursal,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoSucursalController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Sucursal> {
    return this.empleadoRepository.sucursal(id);
  }
}
