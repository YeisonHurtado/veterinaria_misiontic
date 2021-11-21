import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ClinicaVeterinaria} from './clinica-veterinaria.model';

@model()
export class MedicoVeterinario extends Entity {
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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  Documento: string;

  @property({
    type: 'string',
    required: true,
  })
  Especialidad: string;

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
    required: false,
  })
  Clave: string;

  @property({
    type: 'string',
    required: true,
  })
  idVeterinaria: string;

  @belongsTo(() => ClinicaVeterinaria)
  clinicaVeterinariaId: string;

  constructor(data?: Partial<MedicoVeterinario>) {
    super(data);
  }
}

export interface MedicoVeterinarioRelations {
  // describe navigational properties here
}

export type MedicoVeterinarioWithRelations = MedicoVeterinario & MedicoVeterinarioRelations;
