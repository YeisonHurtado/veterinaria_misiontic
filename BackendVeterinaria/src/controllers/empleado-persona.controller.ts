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
  Persona,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoPersonaController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Persona> {
    return this.empleadoRepository.persona(id);
  }
}
