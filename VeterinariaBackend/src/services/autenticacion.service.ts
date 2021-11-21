import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { DuenoMascota, MedicoVeterinario } from '../models';
import { DuenoMascotaRepository, MedicoVeterinarioRepository } from '../repositories';
import { Llaves } from '../config/llaves';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(DuenoMascotaRepository)
    public duenoMascotaRepository: DuenoMascotaRepository,
    @repository(MedicoVeterinarioRepository)
    public medicoVeterinarioRepository: MedicoVeterinarioRepository,
  ) { }

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarDuenoMascota(usuario: string, clave: string){
    try{
      let p = this.duenoMascotaRepository.findOne({where:{Correo: usuario, Clave: clave}});
      if (p) {
        return p;
      }
      return false;
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(duenoMascota: DuenoMascota){
    let token = jwt.sign({
      data:{
        id: duenoMascota.Id,
        correo: duenoMascota.Correo,
        nombre: duenoMascota.Nombres + " " + duenoMascota.Apellidos
      }
    },
      Llaves.clavesJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, Llaves.clavesJWT);
      return datos;
    }catch{
      return false;
    }
  }
}
