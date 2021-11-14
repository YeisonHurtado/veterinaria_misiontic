import {Entity, model, property} from '@loopback/repository';

@model()
export class Procedimiento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_procedimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    default: "Ninguno",
  })
  diagnostico?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  historiaClinicaMascotaId?: string;

  constructor(data?: Partial<Procedimiento>) {
    super(data);
  }
}

export interface ProcedimientoRelations {
  // describe navigational properties here
}

export type ProcedimientoWithRelations = Procedimiento & ProcedimientoRelations;
