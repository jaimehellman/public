export default class PaginationSettings{
    page?: number = 1;
    perPage: number = 5;
    totalRecords : number = 5;
}

export class Page{
    constructor(value : number, visible: boolean){
         this.value = value;
         this.visible = visible
    }
    value: number = 0;
    visible: boolean = false; 
}