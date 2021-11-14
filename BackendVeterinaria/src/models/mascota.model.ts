import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ClienteAmo} from './cliente-amo.model';

@model()
export class Mascota extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
  })
  raza?: string;

  @property({
    type: 'number',
    required: true,
  })
  edad_meses: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @belongsTo(() => ClienteAmo)
  clienteAmoId: string;

  @property({
    type: 'string',
  })
  agendaId?: string;

  @property({
    type: 'string',
  })
  procedimientoId?: string;

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
