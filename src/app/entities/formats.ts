export class Formats {
    
    formatId(id: number){
        switch(true){
            
            case (id.toString().length == 1): return "000";
            case (id.toString().length == 2): return "00";
            case (id.toString().length == 3): return "0";
            case (id.toString().length > 3): return "";
            default: return "";

        }
    }

    codeClient(id: number){

        if(id){
            return "C-"+this.formatId(id)+id;
        }
        else{
            return null;
        }

    }

    codeFournisseur(id: number){
        
        if(id){
            return "F-"+this.formatId(id)+id;
        }

        else{
            return null;
        }

    }

    codeBon(id: number, date: Date){

        let newDate : string = date.toString();

        newDate = newDate.replace(/\-/gi, '');
        newDate = newDate.substring(2);
        newDate = newDate.slice(0,-2);
        
        return newDate+"-"+this.formatId(id)+id;
    }





}