export const utils = {
    makeId
      
}
    
    
    export function makeId(length = 4) {
        var txt = '';
        var possible = '123456789';
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return txt;
    }