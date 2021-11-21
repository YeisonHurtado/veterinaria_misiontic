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
} from '@loopback/rest';
import { Llaves } from '../config/llaves';
import {MedicoVeterinario} from '../models';
import {MedicoVeterinarioRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

export class MedicoVeterinarioController {
  constructor(
    @repository(MedicoVeterinarioRepository)
    public medicoVeterinarioRepository : MedicoVeterinarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService,
  ) {}

  @post('/medico-veterinarios')
  @response(200, {
    description: 'MedicoVeterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(MedicoVeterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {
            title: 'NewMedicoVeterinario',
            exclude: ['Id'],
          }),
        },
      },
    })
    medicoVeterinario: Omit<MedicoVeterinario, 'Id'>,
  ): Promise<MedicoVeterinario> {

    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    medicoVeterinario.Clave = claveCifrada;
    let mv = await this.medicoVeterinarioRepository.create(medicoVeterinario);

    //Notificar al usuario
    let destino = medicoVeterinario.Correo;
    let asunto = 'Resgistro en la plataforma AnimalPets';
    let contenido = `Hola señor@ ${medicoVeterinario.Nombres}, estas son sus credenciales de ingreso\nUsuario: ${medicoVeterinario.Correo}\nContraseña: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return mv;
  }

  @get('/medico-veterinarios/count')
  @response(200, {
    description: 'MedicoVeterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MedicoVeterinario) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.medicoVeterinarioRepository.count(where);
  }

  @get('/medico-veterinarios')
  @response(200, {
    description: 'Array of MedicoVeterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MedicoVeterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MedicoVeterinario) filter?: Filter<MedicoVeterinario>,
  ): Promise<MedicoVeterinario[]> {
    return this.medicoVeterinarioRepository.find(filter);
  }

  @patch('/medico-veterinarios')
  @response(200, {
    description: 'MedicoVeterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: MedicoVeterinario,
    @param.where(MedicoVeterinario) where?: Where<MedicoVeterinario>,
  ): Promise<Count> {
    return this.medicoVeterinarioRepository.updateAll(medicoVeterinario, where);
  }

  @get('/medico-veterinarios/{id}')
  @response(200, {
    description: 'MedicoVeterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MedicoVeterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MedicoVeterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<MedicoVeterinario>
  ): Promise<MedicoVeterinario> {
    return this.medicoVeterinarioRepository.findById(id, filter);
  }

  @patch('/medico-veterinarios/{id}')
  @response(204, {
    description: 'MedicoVeterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicoVeterinario, {partial: true}),
        },
      },
    })
    medicoVeterinario: MedicoVeterinario,
  ): Promise<void> {
    await this.medicoVeterinarioRepository.updateById(id, medicoVeterinario);
  }

  @put('/medico-veterinarios/{id}')
  @response(204, {
    description: 'MedicoVeterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() medicoVeterinario: MedicoVeterinario,
  ): Promise<void> {
    await this.medicoVeterinarioRepository.replaceById(id, medicoVeterinario);
  }

  @del('/medico-veterinarios/{id}')
  @response(204, {
    description: 'MedicoVeterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.medicoVeterinarioRepository.deleteById(id);
  }
}
