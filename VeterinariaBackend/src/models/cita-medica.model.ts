import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model()
export class CitaMedica extends Entity {
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
  NombreMascota: string;

  @property({
    type: 'string',
    required: true,
  })
  DocumentoDueno: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaCita: string;

  @property({
    type: 'string',
    required: true,
  })
  HoraCita: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Mascota)
  MascotaId: string;

  constructor(data?: Partial<CitaMedica>) {
    super(data);
  }
}

export interface CitaMedicaRelations {
  // describe navigational properties here
}

export type CitaMedicaWithRelations = CitaMedica & CitaMedicaRelations;
