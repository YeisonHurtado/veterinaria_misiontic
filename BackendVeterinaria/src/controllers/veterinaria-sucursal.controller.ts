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
  Veterinaria,
  Sucursal,
} from '../models';
import {VeterinariaRepository} from '../repositories';

export class VeterinariaSucursalController {
  constructor(
    @repository(VeterinariaRepository) protected veterinariaRepository: VeterinariaRepository,
  ) { }

  @get('/veterinarias/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Array of Veterinaria has many Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sucursal>,
  ): Promise<Sucursal[]> {
    return this.veterinariaRepository.sucursales(id).find(filter);
  }

  @post('/veterinarias/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Veterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInVeterinaria',
            exclude: ['id'],
            optional: ['veterinariaId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'id'>,
  ): Promise<Sucursal> {
    return this.veterinariaRepository.sucursales(id).create(sucursal);
  }

  @patch('/veterinarias/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Veterinaria.Sucursal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Partial<Sucursal>,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.veterinariaRepository.sucursales(id).patch(sucursal, where);
  }

  @del('/veterinarias/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Veterinaria.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.veterinariaRepository.sucursales(id).delete(where);
  }
}
