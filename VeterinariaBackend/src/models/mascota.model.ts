import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {DuenoMascota} from './dueno-mascota.model';
import { CitaMedica } from './cita-medica.model';
import { HistorialClinico } from './historial-clinico.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Especie: string;

  @property({
    type: 'string',
    required: true,
  })
  Raza: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  Genero: string;
/*
  @property({
    type: 'string',
    required: false,
  })
  idDueno: string;
*/
  @belongsTo(() => DuenoMascota)
  duenoMascotaId: string;

  @hasMany(() => CitaMedica)
  citaMedicas: CitaMedica[];

  @hasMany(() => HistorialClinico)
  historialClinicos: HistorialClinico[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
