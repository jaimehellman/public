import { Entity } from './core/entity';

export default class GrupoEtapa  extends Entity{
  sequencial: number  = 0;
  nomeGrupoEtapa: string  = "";
  descricaoGrupoEtapa: string  = "";
  pai: number = 0;
}
