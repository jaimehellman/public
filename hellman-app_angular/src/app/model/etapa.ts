import { Entity } from './core/entity';

export default class Etapa extends Entity {
    sequencial: number = 0;
    codigoGrupoEtapa: number = 0;
    nome: string = "";
    descricao: string = "";
    numeroPosicao: number = 0;
    quantidadeEntrega?: number = 0;
    duracaoEntregaMeses: number = 0;
    dataCadastro: Date = new Date();
    dataFormatada: string = "";
    usuarioCadastro: string  = "";
  }