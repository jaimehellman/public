import BaseService from "./BaseService";
import GrupoEtapa from "../../Models/GrupoEtapa";
import Teste from "../../Models/Teste";
class MockService extends BaseService  {

    ListarGruposEtapas = async () => {
        let response: any = await this.GetAll("");
        return response as Array<GrupoEtapa>;
    };

    ListarGruposEtapasTree = async () => {
        let response: any = await this.GetAll("");
        return response as Array<Teste>;
    };
}
export default new MockService();