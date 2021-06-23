import { Component, OnInit } from '@angular/core';

import TableSettings, { GridviewType, TableHeader, ActionPosition, ActionType } from '../../core/gridview/table-settings';

import CoreComponent from '../../core/core-component';
import GrupoEtapa from '../../model/grupo-etapa'; 
import Combo from '../../core/combo/combo';
import { GridviewService } from '../../core/gridview/gridview.service';
import GrupoEtapaService from '../../services/grupo-etapa.service';

@Component({
  selector: 'app-grupo-etapa',
  templateUrl: './grupo-etapa.component.html',
  styleUrls: ['./grupo-etapa.component.css']
})
export class GrupoEtapaComponent  implements OnInit {

  grupos : Array<GrupoEtapa> = new Array<GrupoEtapa>();
  comboGrupo : Array<Combo> = new Array<Combo>();
  headers: any  = [
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
      columnName : "descricaoGrupoEtapa"
    }
  ]

  actions: any = [
    {
      icon:"plus",
      type: ActionType.Header,
      url:"/home"
    },
    {
      icon:"pencil",
      type: ActionType.Row,
      url:"/home"
    }
  ]
 
  constructor(
    private gridviewService : GridviewService,
    private  grupoEtapaService : GrupoEtapaService
    ) { 
  }

  ngOnInit() {
     this.carregarGrupos();
  }

  carregarGrupos()
  {
    this.grupoEtapaService.ListarGrupoEtapa().subscribe(res => this.carregarLista(res));
  }

  carregarLista(res)
  {
     this.grupos = res.data as Array<GrupoEtapa>; 
     let settings : TableSettings  = {
         data: this.grupos,
         headers : this.headers,
         actions: this.actions
     }
     this.gridviewService.setData(settings);
     this.carregarCombo();
  }

  carregarCombo(){
      
    /* this.comboGrupo = this.grupos.map((grupo) => ({
          value: grupo.sequencial,
          text: grupo.nomeGrupoEtapa,
      }));*/
     
  }

  saveInline(formInline)
  {
    let grupo : GrupoEtapa  = formInline.value as GrupoEtapa;
  }

  deleteInline(grupo)
  {
    console.log(grupo);
  }


  
  

}
