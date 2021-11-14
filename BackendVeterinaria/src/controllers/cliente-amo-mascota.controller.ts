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
  ClienteAmo,
  Mascota,
} from '../models';
import {ClienteAmoRepository} from '../repositories';

export class ClienteAmoMascotaController {
  constructor(
    @repository(ClienteAmoRepository) protected clienteAmoRepository: ClienteAmoRepository,
  ) { }

  @get('/cliente-amos/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of ClienteAmo has many Mascota',
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
    return this.clienteAmoRepository.mascotas(id).find(filter);
  }

  @post('/cliente-amos/{id}/mascotas', {
    responses: {
      '200': {
        description: 'ClienteAmo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ClienteAmo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInClienteAmo',
            exclude: ['id'],
            optional: ['clienteAmoId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.clienteAmoRepository.mascotas(id).create(mascota);
  }

  @patch('/cliente-amos/{id}/mascotas', {
    responses: {
      '200': {
        description: 'ClienteAmo.Mascota PATCH success count',
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
    return this.clienteAmoRepository.mascotas(id).patch(mascota, where);
  }

  @del('/cliente-amos/{id}/mascotas', {
    responses: {
      '200': {
        description: 'ClienteAmo.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.clienteAmoRepository.mascotas(id).delete(where);
  }
}
