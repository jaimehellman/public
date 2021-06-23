import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableSettings,{TableHeader,ActionPosition, Action, ActionType} from '../TableSettings';

import PaginationService from '../../pagination/PaginationService';
import PaginationSettings from '../../pagination/PaginationSettings';
import Pagination from '../../pagination/Pagination';


interface GridviewProps {
    id: string;
    type: string;
    actionPosition: string;
    pagination?: boolean;
    perPage?: number;
    settings: TableSettings;
}

const GridviewDetail: React.FC<GridviewProps> = ({
    id,
    type,
    actionPosition,
    pagination,
    perPage,
    settings
  }) => {
  
    const [page, setPage] = React.useState(1);
    const [gridSettings, setGridSettings] = React.useState(settings);
    const [total, setTotal] = React.useState(0);
    const [editting, setEditting] = React.useState(false);
    const [row, setRow] = React.useState(settings.data[0]);




    function renderHeader(header: TableHeader){
        let title = header.columnTitle;
        let th = null;
        if(header.align == "center"){
            th = (<th key={title} style={{ textAlign: "center"}}>{header.columnTitle}</th>)
        }
        else if(header.align == "right"){
            th = (<th key={title} style={{ textAlign: "right"}}>{header.columnTitle}</th>)
        }
        else if(header.align == "left"){
            th =  (<th key={title} style={{ textAlign: "left"}}>{header.columnTitle}</th>)
        }else{
            th  = (<th key={title} style={{ textAlign: "left"}}>{header.columnTitle}</th>)
        }
        return th;
    }

    function renderHeaderAction(type : ActionPosition){
        let position : ActionPosition = actionPosition.toLowerCase() === "left"
          ? ActionPosition.Left: ActionPosition.Right;
          let actions = gridSettings.actions;
          if(actions){
              actions = actions.filter(x=>x.type == ActionType.Header);
                if( position == type){
                    return(
                        <th className="ctr actions" scope="col">
                           {actions.map(renderCustomheaderAction)}
                        </th>
                    )
                }
          }
    }

    function renderCustomheaderAction(action: Action){
        if(action.icon){
            return (
                <Link to={action.url}><i className={"fa fa-"+action.icon}></i></Link>
            )
        }else{
            return (
                <Link to={action.url}>{action.text}</Link>
            )
        }
    }


    /*--------- rows ------------*/
    function renderRow(dt: any, index: number){
        let headers: Array<TableHeader> = settings.headers;
        let key = headers.find(x=>x.key);
        let cells = null;
        if(key){
            return (
                <tr key={dt[key.columnName]}  className={""+showLine(index)}>
                 {
                      cells =  renderAction(ActionPosition.Left, dt, index)
                 }
                 {
                    settings.headers.map(function (header : TableHeader) {
                       cells = renderCell(dt,header);
                       return cells;
                    })
                }
                {
                      cells =  renderAction(ActionPosition.Right, dt,index)
                }
                </tr>
            )
        }
    }
    
    function renderAction(type : ActionPosition, row: any, index: number){
        let position : ActionPosition = actionPosition.toLowerCase() === "left"
           ? ActionPosition.Left: ActionPosition.Right;
        let actions = gridSettings.actions;
        if(actions){
            actions = actions.filter(x=>x.type == ActionType.Row);
            if( position == type){
                return (
                  <td className="ctr actions">
                    {
                        actions.map(renderCustomActions)
                    }
                  </td>
                )
            }
        }
    }

    function renderCustomActions(action: Action){
       if(action.icon)
       {
        return (<Link to={action.url}><i className={"fa fa-"+action.icon}></i></Link>)
       }
       else{
            return (
                <Link to={action.url}>{action.text}</Link>
            )    
        }
    }

    function renderCell(dt: any, header: TableHeader){
        return (<td><span>{dt[header.columnName]}</span></td>)
    }

    function changePage(current: number ){
         setPage(current);
    }


    function showLine(index: number){
        if(perPage !== undefined){
            let min = index >= (page-1)*perPage;
            let max = index < page * perPage;
            return !(min && max)?"hidden":"";
        }
    }
    
    function deleteInline(row: any){
        console.log(row);
    }
 

    useEffect(() => {
        setGridSettings(settings);
        setTotal(settings.data.length)
    },[settings,total,page]);



    return (
       <div>
            <table id={id} className="table">
                <thead>
                    <tr>
                        {renderHeaderAction(ActionPosition.Left)}
                        {gridSettings.headers.map(renderHeader)}
                        {renderHeaderAction(ActionPosition.Right)}
                    </tr>
                </thead>
                <tbody>
                       {gridSettings.data.map((current: any, index: number) => {
                            return renderRow(current,index);
                       })}
                </tbody>
            </table>
           <Pagination 
              page={page}
              perPage={perPage?perPage:5}  
              totalRecords={total}
              changePage={changePage}
            />
           
       </div>
    );
  };
  
  export default GridviewDetail;