import {Entity, hasMany, model, property} from '@loopback/repository';
import {Sucursal} from './sucursal.model';

@model()
export class Veterinaria extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  razon_social: string;

  @property({
    type: 'string',
    required: true,
  })
  propietario: string;

  @hasMany(() => Sucursal)
  sucursales: Sucursal[];

  constructor(data?: Partial<Veterinaria>) {
    super(data);
  }
}

export interface VeterinariaRelations {
  // describe navigational properties here
}

export type VeterinariaWithRelations = Veterinaria & VeterinariaRelations;
