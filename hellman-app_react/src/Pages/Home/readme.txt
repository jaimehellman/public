setSettings({...settings, data: grps, headers : headers,actions: actions });
let combo = grps.map((group) => ({
  value: group.sequencial.toString(),
  text: group.nomeGrupoEtapa,
}));
let combo = grps.map((grupo) => ({
  value: grupo.sequencial,
  text: grupo.nomeGrupoEtapa,
  parent: grupo.parent
}))

<GridviewDetail
  id={"GrupoEtapa"}
  type={"inline"}
  actionPosition={"left"}
  pagination={true}
  perPage={5}
  settings={settings}
/>

<ComboBox 
  id="grupo" 
  value="1"
  multiple={true}
  checkbox={true}
  name="grupoEtapa"
  data={grupos}
/>

<ComboSearch 
  id="grupo" 
  value="1"
  multiple={true}
  checkbox={true}
  name="grupoEtapa"
  data={grupos}
/>

 <ComboTree 
   id="grupo" 
   value="1"
   name="grupoEtapa"
   multiple={true}
   checkbox={true}
   data={grupos}
 />

<ComboGrid
  id="grupo" 
  value="1"
  name="grupoEtapa"
  multiple={true}
  checkbox={true}
  headers={headers}
  data={grupos}
/>

<ComboTreeGrid
  id="grupo" 
  value="1"
  name="grupoEtapa"
  multiple={true}
  checkbox={true}
  headers={headersCombo}
  data={grupos}
/>

OpenMessage(MessageType.Success, "Registro salvo com sucesso!","");
OpenAlert(MessageType.Warning, "Registro salvo com sucesso!","");
OpenToast("Teste",MessageType.Warning, "Registro salvo com sucesso!","","window");
OpenConfirm("Teste", "Gostaria de continuar a operação?","Confirmar","Cancelar");
OpenModal(Teste,null);
