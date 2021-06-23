export default class StringUtil{
    static ucfirst(value: string){
        value = value.toLowerCase();
        return value.substring(0,1).toUpperCase() + value.substring(1); 
    }
}