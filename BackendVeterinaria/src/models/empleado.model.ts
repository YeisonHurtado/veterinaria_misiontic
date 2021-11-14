import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Sucursal} from './sucursal.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasOne(() => Persona)
  persona: Persona;

  @belongsTo(() => Sucursal)
  sucursalId: string;

  @property({
    type: 'string',
  })
  agendaId?: string;

  @property({
    type: 'string',
  })
  procedimientoId?: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
