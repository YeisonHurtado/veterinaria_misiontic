import {Entity, model, property, hasOne} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {ClienteAmo} from './cliente-amo.model';
import {Mascota} from './mascota.model';

@model()
export class Agenda extends Entity {
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
  fecha_cita: string;

  @property({
    type: 'boolean',
    required: true,
  })
  cancelado: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  asistio: boolean;

  @property({
    type: 'string',
    required: true,
  })
  motivo_cita: string;

  @hasOne(() => Empleado)
  empleado: Empleado;

  @hasOne(() => ClienteAmo)
  clienteAmo: ClienteAmo;

  @hasOne(() => Mascota)
  mascota: Mascota;

  constructor(data?: Partial<Agenda>) {
    super(data);
  }
}

export interface AgendaRelations {
  // describe navigational properties here
}

export type AgendaWithRelations = Agenda & AgendaRelations;
