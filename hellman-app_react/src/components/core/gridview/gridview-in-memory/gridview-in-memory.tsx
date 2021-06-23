import React, { useEffect } from 'react';
import TableSettings,{TableHeader,ActionPosition} from '../TableSettings';

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

export enum Action {
    Insert = 1,
    Edit = 2,
    Delete = 3,
}

const GridviewInMemory: React.FC<GridviewProps> = ({
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
          if( position == type){
              return(
                <th className="ctr actions" scope="col">
                    <a onClick={() => insertRow()}>
                        <i className="fa fa-plus"></i>
                    </a>
                 </th>
              )
          }
    }


    function renderInsertRow(){
        if(editting){
            return(
                <tr>
                    {renderSaveAction(ActionPosition.Left)}
                    {settings.headers.map(renderInsert)}
                    {renderSaveAction(ActionPosition.Right)}
                 </tr>
            );
        }
    }

    function renderInsert(header: TableHeader){
        return (
            <td>
                <input 
                   disabled = {header.disabled}
                   defaultValue={row[header.columnName]}
                   onChange={($event) => changeRow(header.columnName,$event.target)}
                   name={header.columnName}
                   className="form-control"/>
            </td>
        )
    }

    function renderSaveAction(type : ActionPosition){
        let position : ActionPosition = actionPosition.toLowerCase() === "left"
           ? ActionPosition.Left: ActionPosition.Right;
        if( position == type){
            return (
                <td className="ctr actions">
                    <a><i onClick={() => saveInline(Action.Insert,-1)} className="fa fa-save"></i></a>
                    <a><i onClick={() => cancelInsert()} className="fa fa-ban"></i></a>
                </td>
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
        if( position == type){
            if(!row.editting){
                return (
                    <td className="ctr actions">
                        <a><i onClick={() => editRow(row,index)} className="fa fa-pencil"></i></a>
                        <a><i onClick={() => deleteInline(row,index)} className="fa fa-trash"></i></a>
                    </td>
                )
            }else{
                return (
                    <td className="ctr actions">
                        <a><i onClick={() => saveInline(Action.Edit, index)} className="fa fa-save"></i></a>
                        <a><i onClick={() => cancelEdit(row,index)}  className="fa fa-ban"></i></a>
                    </td>
                )
            }
         
        }
    }

    function renderCell(dt: any, header: TableHeader){
        if(dt.editting){
            return (
             <td>
                 <input 
                    disabled = {header.disabled}
                    name={header.columnName}
                    defaultValue={row[header.columnName]}
                    onChange={($event) => changeRow(header.columnName,$event.target)}
                    className="form-control"/>
             </td>)
         }else{
             return (<td><span>{dt[header.columnName]}</span></td>)
         }
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

    function insertRow(){
        setEditting(true);
        clearRow();
    }

    function clearRow(){
        var row:any = {};
        settings.headers.forEach(header => {
            row[header.columnName] = "";
        });
        setRow(row);
    }

    function cancelInsert(){
        setEditting(false);
    }


    function editRow(row: any, index: number){
        row.editting = true;
        let data = gridSettings.data;
        data.splice(index,1,row)
        setRow(row);
        setGridSettings({...gridSettings, data: data});
    }

    function cancelEdit(row: any, index: number){
        row.editting = false;
        changeData(row, index);
       
    }

    function changeData(row: any, index: number){
        let data = gridSettings.data;
        data.splice(index,1,row);
        setGridSettings({...gridSettings, data: data});
    }

    const changeRow = (field:any,element: any) => {
        let rw = row;
        rw[field] = element.value;
        setRow(rw);
    };

    function saveInline(action: Action, index: number){
        let data = gridSettings.data;
        if(action == Action.Insert){
            let key = gridSettings.headers.find(x=>x.key);
            if(key){
                row[key.columnName] = data.length+1;
            }
            data.push(row);
            cancelInsert();
        }
        else if(action == Action.Edit){
            cancelEdit(row,index);
        }
        setGridSettings({...gridSettings, data: data});
        clearRow();
    }
    
    function deleteInline(row: any,index: number){
        let data = gridSettings.data;
        data.splice(index,1);
        setGridSettings({...gridSettings, data: data});
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
                       {renderInsertRow()}
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
  
  export default GridviewInMemory;