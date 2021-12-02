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
import { Llaves } from '../config/llaves';
import {AsistenteVeterinaria, Credenciales} from '../models';
import {AsistenteVeterinariaRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

export class AsistenteVeterinariaController {
  constructor(
    @repository(AsistenteVeterinariaRepository)
    public asistenteVeterinariaRepository : AsistenteVeterinariaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
  ) {}

  @post('/identificarAsistenteVeterinaria', {
    responses:{
      '200':{
        description: "Identificación de usuarios"
      }
    }
  })
  async identificarAsistenteVeterinaria(
    @requestBody() credenciales: Credenciales
  ) {
    let av = await this.servicioAutenticacion.IdentificarAsistenteVeterinaria(credenciales.Usuario, credenciales.Clave);
    if (av) {
      let token = this.servicioAutenticacion.GenerarTokenJWT_AV(av);
      return{
        datos: {
          nombre: av.Nombres,
          correo: av.Correo,
          id: av.Id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos inválidos");
    }
  }

  @post('/asistente-veterinarias')
  @response(200, {
    description: 'AsistenteVeterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsistenteVeterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {
            title: 'NewAsistenteVeterinaria',
            exclude: ['Id'],
          }),
        },
      },
    })
    asistenteVeterinaria: Omit<AsistenteVeterinaria, 'Id'>,
  ): Promise<AsistenteVeterinaria> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    asistenteVeterinaria.Clave = claveCifrada;
    let av = await this.asistenteVeterinariaRepository.create(asistenteVeterinaria);

    //Notificar al usuario
    let destino = asistenteVeterinaria.Correo;
    let asunto = 'Resgistro en la plataforma AnimalPets';
    let contenido = `Hola señor@ ${asistenteVeterinaria.Nombres}, estas son sus credenciales de ingreso. El Usuario: ${asistenteVeterinaria.Correo} y la Contraseña: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return av;
  }

  @get('/asistente-veterinarias/count')
  @response(200, {
    description: 'AsistenteVeterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsistenteVeterinaria) where?: Where<AsistenteVeterinaria>,
  ): Promise<Count> {
    return this.asistenteVeterinariaRepository.count(where);
  }

  @get('/asistente-veterinarias')
  @response(200, {
    description: 'Array of AsistenteVeterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsistenteVeterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsistenteVeterinaria) filter?: Filter<AsistenteVeterinaria>,
  ): Promise<AsistenteVeterinaria[]> {
    return this.asistenteVeterinariaRepository.find(filter);
  }

  @patch('/asistente-veterinarias')
  @response(200, {
    description: 'AsistenteVeterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {partial: true}),
        },
      },
    })
    asistenteVeterinaria: AsistenteVeterinaria,
    @param.where(AsistenteVeterinaria) where?: Where<AsistenteVeterinaria>,
  ): Promise<Count> {
    return this.asistenteVeterinariaRepository.updateAll(asistenteVeterinaria, where);
  }

  @get('/asistente-veterinarias/{id}')
  @response(200, {
    description: 'AsistenteVeterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsistenteVeterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AsistenteVeterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<AsistenteVeterinaria>
  ): Promise<AsistenteVeterinaria> {
    return this.asistenteVeterinariaRepository.findById(id, filter);
  }

  @patch('/asistente-veterinarias/{id}')
  @response(204, {
    description: 'AsistenteVeterinaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsistenteVeterinaria, {partial: true}),
        },
      },
    })
    asistenteVeterinaria: AsistenteVeterinaria,
  ): Promise<void> {
    await this.asistenteVeterinariaRepository.updateById(id, asistenteVeterinaria);
  }

  @put('/asistente-veterinarias/{id}')
  @response(204, {
    description: 'AsistenteVeterinaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asistenteVeterinaria: AsistenteVeterinaria,
  ): Promise<void> {
    await this.asistenteVeterinariaRepository.replaceById(id, asistenteVeterinaria);
  }

  @del('/asistente-veterinarias/{id}')
  @response(204, {
    description: 'AsistenteVeterinaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asistenteVeterinariaRepository.deleteById(id);
  }
}
