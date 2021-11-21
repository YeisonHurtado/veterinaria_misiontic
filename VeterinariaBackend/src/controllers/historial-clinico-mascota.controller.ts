import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistorialClinico,
  Mascota,
} from '../models';
import {HistorialClinicoRepository} from '../repositories';

export class HistorialClinicoMascotaController {
  constructor(
    @repository(HistorialClinicoRepository)
    public historialClinicoRepository: HistorialClinicoRepository,
  ) { }

  @get('/historial-clinicos/{id}/mascota', {
    responses: {
      '200': {
        description: 'HistorialClinico belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof HistorialClinico.prototype.Id,
  ): Promise<Mascota> {
    return this.historialClinicoRepository.mascota(id);
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
  HistorialClinico,
  Mascota,
} from '../models';
import {HistorialClinicoRepository} from '../repositories';

export class HistorialClinicoMascotaController {
  constructor(
    @repository(HistorialClinicoRepository) protected historialClinicoRepository: HistorialClinicoRepository,
  ) { }

  @get('/historial-clinicos/{id}/mascota', {
    responses: {
      '200': {
        description: 'HistorialClinico has one Mascota',
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
    return this.historialClinicoRepository.mascota(id).get(filter);
  }

  @post('/historial-clinicos/{id}/mascota', {
    responses: {
      '200': {
        description: 'HistorialClinico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof HistorialClinico.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInHistorialClinico',
            exclude: ['Id'],
            optional: ['historialClinicoId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'Id'>,
  ): Promise<Mascota> {
    return this.historialClinicoRepository.mascota(id).create(mascota);
  }

  @patch('/historial-clinicos/{id}/mascota', {
    responses: {
      '200': {
        description: 'HistorialClinico.Mascota PATCH success count',
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
    return this.historialClinicoRepository.mascota(id).patch(mascota, where);
  }

  @del('/historial-clinicos/{id}/mascota', {
    responses: {
      '200': {
        description: 'HistorialClinico.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.historialClinicoRepository.mascota(id).delete(where);
  }
}*/
