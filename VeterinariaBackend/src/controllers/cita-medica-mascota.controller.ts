import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CitaMedica,
  Mascota,
} from '../models';
import {CitaMedicaRepository} from '../repositories';

export class CitaMedicaMascotaController {
  constructor(
    @repository(CitaMedicaRepository)
    public citaMedicaRepository: CitaMedicaRepository,
  ) { }

  @get('/cita-medicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'CitaMedica belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof CitaMedica.prototype.Id,
  ): Promise<Mascota> {
    return this.citaMedicaRepository.mascota(id);
  }
}

/*import {
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
  CitaMedica,
  Mascota,
} from '../models';
import {CitaMedicaRepository} from '../repositories';

export class CitaMedicaMascotaController {
  constructor(
    @repository(CitaMedicaRepository) protected citaMedicaRepository: CitaMedicaRepository,
  ) { }

  @get('/cita-medicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'CitaMedica has one Mascota',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mascota),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota> {
    return this.citaMedicaRepository.mascota(id).get(filter);
  }

  @post('/cita-medicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'CitaMedica model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CitaMedica.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInCitaMedica',
            exclude: ['Id'],
            optional: ['citaMedicaId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'Id'>,
  ): Promise<Mascota> {
    return this.citaMedicaRepository.mascota(id).create(mascota);
  }

  @patch('/cita-medicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'CitaMedica.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.citaMedicaRepository.mascota(id).patch(mascota, where);
  }

  @del('/cita-medicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'CitaMedica.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.citaMedicaRepository.mascota(id).delete(where);
  }
}*/
