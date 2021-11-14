import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Persona} from './persona.model';

@model()
export class ClienteAmo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @property({
    type: 'string',
  })
  agendaId?: string;

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<ClienteAmo>) {
    super(data);
  }
}

export interface ClienteAmoRelations {
  // describe navigational properties here
}

export type ClienteAmoWithRelations = ClienteAmo & ClienteAmoRelations;
