import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {DuenoMascota} from '../models';
import { Credenciales } from '../models/credenciales.model';
import {DuenoMascotaRepository} from '../repositories';
import { AutenticacionService } from '../services';
import { Llaves } from '../config/llaves';
const fetch = require('node-fetch');

export class DuenoMascotaController {
  constructor(
    @repository(DuenoMascotaRepository)
    public duenoMascotaRepository : DuenoMascotaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService,
  ) {}

  @post('/identificarDuenoMascota', {
    responses:{
      '200':{
        description: "Identificación de usuarios"
      }
    }
  })
  async identificarDuenoMascota(
    @requestBody() credenciales: Credenciales
  ) {
    let dm = await this.servicioAutenticacion.IdentificarDuenoMascota(credenciales.Usuario, credenciales.Clave);
    if (dm) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(dm);
      return{
        datos: {
          nombre: dm.Nombres,
          correo: dm.Correo,
          id: dm.Id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos inválidos");
    }
  }

  @post('/dueno-mascotas')
  @response(200, {
    description: 'DuenoMascota model instance',
    content: {'application/json': {schema: getModelSchemaRef(DuenoMascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DuenoMascota, {
            title: 'NewDuenoMascota',
            exclude: ['Id'],
          }),
        },
      },
    })
    duenoMascota: Omit<DuenoMascota, 'Id'>,
  ): Promise<DuenoMascota> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    duenoMascota.Clave = claveCifrada;
    let dm = await this.duenoMascotaRepository.create(duenoMascota);

    //Notificar al usuario
    let destino = duenoMascota.Correo;
    let asunto = 'Resgistro en la plataforma AnimalPets';
    let contenido = `Hola señor@ ${duenoMascota.Nombres}, estas son sus credenciales de ingreso\nUsuario: ${duenoMascota.Correo}\nContraseña: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return dm;
  }

  @get('/dueno-mascotas/count')
  @response(200, {
    description: 'DuenoMascota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DuenoMascota) where?: Where<DuenoMascota>,
  ): Promise<Count> {
    return this.duenoMascotaRepository.count(where);
  }

  @get('/dueno-mascotas')
  @response(200, {
    description: 'Array of DuenoMascota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DuenoMascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DuenoMascota) filter?: Filter<DuenoMascota>,
  ): Promise<DuenoMascota[]> {
    return this.duenoMascotaRepository.find(filter);
  }

  @patch('/dueno-mascotas')
  @response(200, {
    description: 'DuenoMascota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DuenoMascota, {partial: true}),
        },
      },
    })
    duenoMascota: DuenoMascota,
    @param.where(DuenoMascota) where?: Where<DuenoMascota>,
  ): Promise<Count> {
    return this.duenoMascotaRepository.updateAll(duenoMascota, where);
  }

  @get('/dueno-mascotas/{id}')
  @response(200, {
    description: 'DuenoMascota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DuenoMascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DuenoMascota, {exclude: 'where'}) filter?: FilterExcludingWhere<DuenoMascota>
  ): Promise<DuenoMascota> {
    return this.duenoMascotaRepository.findById(id, filter);
  }

  @patch('/dueno-mascotas/{id}')
  @response(204, {
    description: 'DuenoMascota PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DuenoMascota, {partial: true}),
        },
      },
    })
    duenoMascota: DuenoMascota,
  ): Promise<void> {
    await this.duenoMascotaRepository.updateById(id, duenoMascota);
  }

  @put('/dueno-mascotas/{id}')
  @response(204, {
    description: 'DuenoMascota PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() duenoMascota: DuenoMascota,
  ): Promise<void> {
    await this.duenoMascotaRepository.replaceById(id, duenoMascota);
  }

  @del('/dueno-mascotas/{id}')
  @response(204, {
    description: 'DuenoMascota DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.duenoMascotaRepository.deleteById(id);
  }
}
