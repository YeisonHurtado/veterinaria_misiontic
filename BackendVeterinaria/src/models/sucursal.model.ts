import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Veterinaria} from './veterinaria.model';
import {Empleado} from './empleado.model';

@model()
export class Sucursal extends Entity {
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
  nombre_sucursal: string;

  @property({
    type: 'string',
    required: true,
  })
  encargado: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_apertura: string;

  @belongsTo(() => Veterinaria)
  veterinariaId: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @property({
    type: 'string',
  })
  procedimientoId?: string;

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
