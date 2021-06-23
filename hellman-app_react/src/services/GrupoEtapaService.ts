import BaseService from "./core/BaseService";
import GrupoEtapa from "../Models/GrupoEtapa";

class GrupoEtapaService extends BaseService {
  InserirGrupoEtapa = async (grupo: GrupoEtapa) => {
    let action = "InserirGrupoEtapa";
    let response: any = await this.Insert(grupo, action);
    return response.data as number;
  };

  AlterarGrupoEtapa = async (grupo: GrupoEtapa) => {
    await this.Update(grupo, "AlterarGrupoEtapa");
  };

  DeletarGrupoEtapa = async (id: number) => {
    await this.Delete(id, "DeletarGrupoEtapa");
  };

  DetalharGrupoEtapa = async (id: number) => {
    let response: any = await this.GetById(id, "DetalharGrupoEtapa");
    return response.data as GrupoEtapa;
  };

  ListarGrupoEtapa = async () => {
    let response: any = await this.GetAllPost("ListarGrupoEtapas");
    return response.data as Array<GrupoEtapa>;
  };
}

export default new GrupoEtapaService();
