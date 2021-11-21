import {Entity, model, property, hasMany} from '@loopback/repository';
import {MedicoVeterinario} from './medico-veterinario.model';
import {AsistenteVeterinaria} from './asistente-veterinaria.model';

@model()
export class ClinicaVeterinaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nit: string;

  @property({
    type: 'string',
    required: true,
  })
  RazonSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  SitioWeb: string;

  @hasMany(() => MedicoVeterinario)
  medicoVeterinarios: MedicoVeterinario[];

  @hasMany(() => AsistenteVeterinaria)
  asistenteVeterinarias: AsistenteVeterinaria[];

  constructor(data?: Partial<ClinicaVeterinaria>) {
    super(data);
  }
}

export interface ClinicaVeterinariaRelations {
  // describe navigational properties here
}

export type ClinicaVeterinariaWithRelations = ClinicaVeterinaria & ClinicaVeterinariaRelations;
