import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {Mascota} from './mascota.model';

@model()
export class ClienteAmo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasOne(() => Persona)
  persona: Persona;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @property({
    type: 'string',
  })
  agendaId?: string;

  constructor(data?: Partial<ClienteAmo>) {
    super(data);
  }
}

export interface ClienteAmoRelations {
  // describe navigational properties here
}

export type ClienteAmoWithRelations = ClienteAmo & ClienteAmoRelations;
