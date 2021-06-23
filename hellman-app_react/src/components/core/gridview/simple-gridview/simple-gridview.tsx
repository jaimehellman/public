import React, { useEffect } from 'react';
import TableSettings,{TableHeader} from '../TableSettings';

import PaginationService from '../../pagination/PaginationService';
import PaginationSettings from '../../pagination/PaginationSettings';
import Pagination from '../../pagination/Pagination';

interface SimpleGridviewProps {
    id: string;
    type: string;
    actionPosition: string;
    pagination?: boolean;
    perPage?: number;
    settings: TableSettings;
}

const SimpleGridview: React.FC<SimpleGridviewProps> = ({
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
    const [count, setCount] = React.useState(0);


    function renderHeader(header: TableHeader){
        let title = header.columnTitle;
        if(header.align == "center"){
            return (<th key={title} style={{ textAlign: "center"}}>{header.columnTitle}</th>)
        }
        else if(header.align == "right"){
            return (<th key={title} style={{ textAlign: "right"}}>{header.columnTitle}</th>)
        }
        else if(header.align == "left"){
            return (<th key={title} style={{ textAlign: "left"}}>{header.columnTitle}</th>)
        }else{
            return (<th key={title} style={{ textAlign: "left"}}>{header.columnTitle}</th>)
        }
    }

    function renderRow(dt: any, index: number){
        let headers: Array<TableHeader> = settings.headers;
        let key = headers.find(x=>x.key);
        if(key){
            return (
                <tr key={dt[key.columnName]}  className={""+showLine(index)}>
                {
                    settings.headers.map(function (header : TableHeader) {
                        return renderCell(dt,header);
                    })
                }
                </tr>
            )
        }
    }

    function renderCell(dt: any, header: TableHeader){
        if(dt.editting){
            return (
             <td>
                 <input 
                    disabled = {header.disabled}
                    name={header.columnName}
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


    useEffect(() => {
        setGridSettings(settings);
        setTotal(settings.data.length)
    },[settings,total,page]);



    return (
       <div>
            <table id={id} className="table">
                <thead>
                    <tr>
                        {settings.headers.map(renderHeader)}
                    </tr>
                </thead>
                <tbody>
                       {settings.data.map((current: any, index: number) => {
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
  
  export default SimpleGridview;