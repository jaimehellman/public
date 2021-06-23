
import React, { useEffect, useContext } from "react";
import GrupoEtapa from "../../Models/GrupoEtapa";
import MockService from "../../services/core/MockService";

import TableSettings, { ActionType } from "../../components/core/gridview/TableSettings";
import ComboTreeGrid from "../../components/core/combo/combotreegrid/combotreegrid";

import GlobalContext from "../../components/core/GlobalContextType";
import Panel from "../../components/core/panel/panel";



const headers: any  = [
  {
    key:true,
    columnTitle : "Código",
    columnName : "sequencial",
    disabled : true,
    align : "center",
  },
  {
    columnTitle : "Nome",
    text: true,
    columnName : "nomeGrupoEtapa"
  },
  {
    columnTitle : "Descricao",
    columnName : "descricaoGrupoEtapa",
    treeField: true
  }
]

const headersCombo: any  = [
  {
    key:true,
    columnTitle : "Código",
    columnName : "sequencial",
    disabled : true,
    align : "center",
  },
  {
    columnTitle : "Nome",
    text: true,
    columnName : "nomeGrupoEtapa"
  },
  {
    columnTitle : "Descricao",
    columnName : "descricaoGrupoEtapa",
  },
  {
    columnTitle : "Pai",
    columnName : "parent",
    treeField: true
  }
]

const actions: any = [
  {
    icon:"plus",
    type: ActionType.Header,
    url:"/create"
  },
  {
    icon:"pencil",
    type: ActionType.Row,
    url:"/edit"
  }
]

const Home: React.FC<any> = ({ history }) => {
  const [settings, setSettings] = React.useState(new TableSettings());
  const [grupos, setGrupos] = React.useState(new Array<any>());
  const { OpenAlert, OpenConfirm, OpenMessage, OpenToast } = useContext(GlobalContext);


  function listarGrupos() {
      MockService.ListarGruposEtapasTree().then(carregarGrupos, onError);
  }

  function carregarGrupos(grps: Array<GrupoEtapa>) {
      setGrupos(grps);
  }

  function onError(error: any) {
   
  }

  useEffect(() => {
    listarGrupos();
  
  },[])

  return (
     <div>
        <h1>S001 - HELLMAN</h1>
        <Panel title="Grupo Etapa"  icon="windows">
          <ComboTreeGrid
            id="grupo" 
            value="1"
            name="grupoEtapa"
            multiple={true}
            checkbox={true}
            headers={headersCombo}
            data={grupos}
          />
        </Panel>
     </div>
  );
};

export default Home;