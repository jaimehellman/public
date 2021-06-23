import { Injectable } from '@angular/core';
import { BaseService } from './core/BaseService';
import { HttpClient } from '@angular/common/http';
import GrupoEtapa from '../model/grupo-etapa';

@Injectable()
export default class GrupoEtapaService extends BaseService<GrupoEtapa, number> {

    constructor(protected _http: HttpClient) {
        super(_http);
    }

    public InserirGrupoEtapa(grupo : GrupoEtapa)
    {
       return super.insert("InserirGrupoEtapa",grupo);
    }

    public AtualizarGrupoEtapa(grupo : GrupoEtapa)
    {
        return super.update("AtualizarGrupoEtapa",grupo);
    }

    public DeletarGrupoEtapa(grupo : GrupoEtapa)
    {
        return super.delete("DeletarGrupoEtapa", grupo.sequencial);
    }

    public DetalharGrupoEtapa(id: number) 
    {
        return super.findById("DetalharGrupoEtapa", id);
    }

    public ListarGrupoEtapa() 
    {
        return super.getAll("ListarGrupoEtapas");
    }

}