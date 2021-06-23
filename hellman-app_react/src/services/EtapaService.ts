import BaseService from "./core/BaseService";
import Etapa from "../Models/Etapa";

class EtapaService extends BaseService {
  InserirEtapa = async (etapa: Etapa) => {
    await this.Insert(etapa, "InserirEtapa");
  };

  AlterarEtapa = async (etapa: Etapa) => {
    await this.Update(etapa, "AlterarEtapa");
  };

  DeletarEtapa = async (id: number) => {
    await this.Delete(id, "DeletarEtapa");
  };

  DetalharEtapa = async (id: number) => {
    let response: any = await this.GetById(id, "DetalharEtapa");
    return response.data as Etapa;
  };

  ListarEtapaPorGrupo = async (codigoGrupo: number) => {
    let response: any = await this.FindAll(codigoGrupo, "ListarEtapasPorGrupo");
    return response.data as Array<Etapa>;
  };
}

export default new EtapaService();