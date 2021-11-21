import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model()
export class HistorialClinico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  Diagnostigo: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  MedicoTratante: string;

  @belongsTo(() => Mascota)
  MascotaId: string;

  constructor(data?: Partial<HistorialClinico>) {
    super(data);
  }
}

export interface HistorialClinicoRelations {
  // describe navigational properties here
}

export type HistorialClinicoWithRelations = HistorialClinico & HistorialClinicoRelations;
