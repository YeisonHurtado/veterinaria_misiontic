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
  DuenoMascota,
  Mascota,
} from '../models';
import {DuenoMascotaRepository} from '../repositories';

export class DuenoMascotaMascotaController {
  constructor(
    @repository(DuenoMascotaRepository) protected duenoMascotaRepository: DuenoMascotaRepository,
  ) { }

  @get('/dueno-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of DuenoMascota has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.duenoMascotaRepository.mascotas(id).find(filter);
  }

  @post('/dueno-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'DuenoMascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DuenoMascota.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInDuenoMascota',
            exclude: ['Id'],
            optional: ['duenoMascotaId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'Id'>,
  ): Promise<Mascota> {
    return this.duenoMascotaRepository.mascotas(id).create(mascota);
  }

  @patch('/dueno-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'DuenoMascota.Mascota PATCH success count',
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
    return this.duenoMascotaRepository.mascotas(id).patch(mascota, where);
  }

  @del('/dueno-mascotas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'DuenoMascota.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.duenoMascotaRepository.mascotas(id).delete(where);
  }
}
