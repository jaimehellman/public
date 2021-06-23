import { Injectable } from '@angular/core';
import { BaseService } from './core/BaseService';
import Etapa from '../model/etapa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export default class EtapaService extends BaseService<Etapa, number> {

    constructor(protected _http: HttpClient) {
        super(_http);
    }

    public InserirEtapa(etapa : Etapa)
    {
        return super.insert("InserirEtapa",etapa);
    }

    public AtualizarEtapa(etapa : Etapa)
    {
        return super.update("AtualizarEtapa",etapa);
    }

    public DeletarEtapa(etapa : Etapa)
    {
        return super.delete("DeletarEtapa", etapa.sequencial);
    }

    public DetalharEtapa(id: number) 
    {
        return super.findById("DetalharEtapa", id);
    }

    public ListarEtapas() 
    {
        return super.getAll("ListarEtapas");
    }

    public ListarEtapasPorGrupo(codigpGrupo : number) 
    {
        return super.findAll("ListarEtapasPorGrupo", codigpGrupo);
    }

}