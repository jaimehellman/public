
export enum GridviewType {
    Inline = 1,
    Detail = 2,
    Simple = 3,
    Memory = 4,
}

export enum ActionPosition {
    Left = 1,
    Right = 2,
}

export class TableHeader{
    key: boolean = false;
    columnName: string;
    columnTitle: string;
    align?: string = "left";
    width? : number;
    disabled?: boolean = false;
}

export enum ActionType{
    Row = 1,
    Header = 2,
}

export class Action{
   icon: string = "";
   text: string = "";
   url: string = "";
   type: ActionType = ActionType.Row;
}

export default class TableSettings{
    id?: string;
    type?: GridviewType;
    data?: any;
    hasActions?: boolean = false;
    actionPosition?: ActionPosition;
    actions?: Array<Action> = new Array<Action> (); 
    headers?: Array<TableHeader> = new Array<TableHeader> ();
    pagination?: boolean = false;
    perPage?: number = 5;
    checkbox?: boolean  = false;
    controller?: string  = "";
    keyValue?: any  = "";
    disabledEdit?:boolean = false;
}



