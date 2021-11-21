import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ClinicaVeterinaria} from './clinica-veterinaria.model';

@model()
export class AsistenteVeterinaria extends Entity {
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
  Cargo: string;

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
  Clave: string;

  @belongsTo(() => ClinicaVeterinaria)
  clinicaVeterinariaId: string;

  constructor(data?: Partial<AsistenteVeterinaria>) {
    super(data);
  }
}

export interface AsistenteVeterinariaRelations {
  // describe navigational properties here
}

export type AsistenteVeterinariaWithRelations = AsistenteVeterinaria & AsistenteVeterinariaRelations;
