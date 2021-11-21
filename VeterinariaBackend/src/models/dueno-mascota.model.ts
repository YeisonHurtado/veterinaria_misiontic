import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model()
export class DuenoMascota extends Entity {
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
  Celular: string;

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

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<DuenoMascota>) {
    super(data);
  }
}

export interface DuenoMascotaRelations {
  // describe navigational properties here
}

export type DuenoMascotaWithRelations = DuenoMascota & DuenoMascotaRelations;
