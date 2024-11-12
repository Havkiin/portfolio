export const isOfType = <T extends Record<string, any>> ( obj : any, key : keyof T ) : obj is T => {
    if (!obj) {
        return false;
    }
    
    return obj[key] !== undefined;
}