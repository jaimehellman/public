export default class PaginationSettings{
    page?: number = 1;
    perPage: number = 5;
    totalRecords : number = 5;

    constructor(page: number, perPage: number, totalRecords: number){
        this.page = page;
        this.perPage = perPage;
        this.totalRecords = totalRecords;
   }
}

export class Page{
    value: number = 0;
    visible: boolean = false; 
    
    constructor(value : number, visible: boolean){
         this.value = value;
         this.visible = visible
    }
}