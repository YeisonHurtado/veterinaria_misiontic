import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { AsistenteVeterinaria, DuenoMascota, MedicoVeterinario } from '../models';
import { AsistenteVeterinariaRepository, DuenoMascotaRepository, MedicoVeterinarioRepository } from '../repositories';
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
    @repository(AsistenteVeterinariaRepository)
    public asistenteVeterinariaRepository: AsistenteVeterinariaRepository
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
  IdentificarMedicoVeterinario(usuario: string, clave: string){
    try{
      let mv = this.medicoVeterinarioRepository.findOne({where:{Correo: usuario, Clave: clave}});
      if (mv) {
        return mv;
      }
      return false;
    }catch{
      return false;
    } 
  }
  IdentificarAsistenteVeterinaria(usuario: string, clave: string){
    try{
      let av = this.asistenteVeterinariaRepository.findOne({where:{Correo: usuario, Clave: clave}});
      if (av) {
        return av;
      }
      return false;
    }catch{
      return false;
    } 
  }

  GenerarTokenJWT_DM(duenoMascota: DuenoMascota){
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
  GenerarTokenJWT_MV(medicoVeterinario: MedicoVeterinario){
    let token = jwt.sign({
      data:{
        id: medicoVeterinario.Id,
        correo: medicoVeterinario.Correo,
        nombre: medicoVeterinario.Nombres + " " + medicoVeterinario.Apellidos
      }
    },
      Llaves.clavesJWT);
    return token;
  }
  GenerarTokenJWT_AV(asistenteVeterinaria: AsistenteVeterinaria){
    let token = jwt.sign({
      data:{
        id: asistenteVeterinaria.Id,
        correo: asistenteVeterinaria.Correo,
        nombre: asistenteVeterinaria.Nombres + " " + asistenteVeterinaria.Apellidos
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
