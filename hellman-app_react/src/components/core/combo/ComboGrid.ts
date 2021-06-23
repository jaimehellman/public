export default class ComboGrid{
    value?: any = 0;
    headers?: any;
    data?: any;
    element?: any;
}

export class ComboGridTableHeader{
    key: boolean = false;
    text: boolean = false;
    columnName: string ="";
    columnTitle: string="";
    align?: string = "left";
    width? : number;
    disabled?: boolean = false;
}

export class ComboTreeGridTableHeader extends ComboGridTableHeader{
   trreField: boolean = false;
   level: number = 0;
}