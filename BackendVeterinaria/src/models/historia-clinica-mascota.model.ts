import {Entity, model, property, hasMany} from '@loopback/repository';
import {Procedimiento} from './procedimiento.model';

@model()
export class HistoriaClinicaMascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_creacion: string;

  @hasMany(() => Procedimiento)
  procedimientos: Procedimiento[];

  constructor(data?: Partial<HistoriaClinicaMascota>) {
    super(data);
  }
}

export interface HistoriaClinicaMascotaRelations {
  // describe navigational properties here
}

export type HistoriaClinicaMascotaWithRelations = HistoriaClinicaMascota & HistoriaClinicaMascotaRelations;
