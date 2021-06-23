export default class Combo{
    
    constructor(value: any = "", text: string = "", parent: any = null ){
         this.value = value;
         this.text = text;
         this.parent = parent;
    }
    value: any = 0;
    text: string = "";
    parent: number = 0;
    children?: any;
    element?: any;
}