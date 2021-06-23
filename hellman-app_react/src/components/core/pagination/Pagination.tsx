import React, { useEffect } from 'react';
import PaginationSettings, { Page } from './PaginationSettings';
interface PaginationProps{
    page?: number;
    perPage: number;
    totalRecords : number;
    changePage: Function;
}
const Pagination: React.FC<PaginationProps> = ({ 
    page,
    perPage,
    totalRecords,
    changePage
 }) => {
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pages, setPages] = React.useState(new Array<Page>());
    const [pageShow, setPageShow] = React.useState(6);
    const [total, setTotal] = React.useState(totalRecords);
    const [paginationSettings, setPaginationSettings] = React.useState(
        new PaginationSettings(page?page:1,perPage,totalRecords)
    );

    useEffect(() => {
        setTotal(totalRecords);
        setPageSettings(1);
    },[totalRecords]);


    function onPage(page : number){
        setCurrentPage(page);
        setPageSettings(page);
    }

    function onNext(page : number){
        setCurrentPage(++page);
        setPageSettings(++page);
    }

    function onPrevious(page : number){
        setCurrentPage(--page);
        setPageSettings(--page);
    }

    function setPageSettings(page: number){
        let aux = totalRecords%perPage;
        let countPages = Math.floor(totalRecords/perPage);
        if(aux !== 0)
        {
            countPages +=1;
        }
        showPages(countPages);
        changePage(page);
    }

    function showPages(countPages: number){
        let pages = [];
        let count = 1;
        for(let i = 0;i < countPages;i++){
            let show = false;
            if(count < currentPage + pageShow)
            {
                show= true;
            }
            pages.push(new Page(count, show));
            count++;
        }
        setPages(pages);
    }

    function activePage(pag: any)
    {
        let active: boolean = false;
        if(pag == currentPage){
            active = true;
        }

        return active?"active":"";
    }

    function visible(page: Page){
        
       return !page.visible?"hidden":"";
    }

    function disabledPage(page : number, type: string)
    {
      
      let disabled: boolean = false;
      if(page == 1 && type == "P"){
         disabled = true;
      }
      else if(page == pages.length && type == "N"){
         disabled = true;
      }

      return disabled?"disabled":"";
    }

    function renderPage(p: Page){
         return  (
              <li  className={"page-item "+ activePage(p.value) + " " + visible(p)}>
                  <a onClick={() => onPage(p.value)}  className="page-link">
                     {p.value}
                  </a>
              </li>
         );
    }

    return (
      <nav aria-label="PageGridview">
            <ul className="pagination">
                    <li className={"page-item "+ disabledPage(currentPage,"P")}>
                         <a  onClick={() => onPrevious(currentPage)} className="page-link">Previous</a>
                    </li>
                    {
                        pages.map(renderPage)
                    }
                   <li className={"page-item "+ disabledPage(currentPage,"N")}>
                         <a  onClick={() => onNext(currentPage)} className="page-link">Next</a>
                    </li>
            </ul>
      </nav>
    );
};

export default Pagination;