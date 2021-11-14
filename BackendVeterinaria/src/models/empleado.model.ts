import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Sucursal} from './sucursal.model';
import {Persona} from './persona.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
