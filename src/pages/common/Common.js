export const BDAY_KEY = "mmori.bday";
export const GRIDTYPE_KEY = "mmori.gtype";
export let DAYS = 0;
export let WEEKS = 1; 
export let MONTHS = 2; 
export let YEARS = 3;

export const loadDate = async(key, defaultVal) => {
    let res = await chrome.storage.sync.get([key]);
    let d = Date.parse(res[key])
    if (isNaN(d)) 
        return defaultVal;
    return d; 
}

// Returns a Date object 
export const loadBday = async (defaultVal) => {
    return loadDate(BDAY_KEY, defaultVal)
}

// Returns an int 
export const loadGridType = async () => {
    let res = await chrome.storage.sync.get([GRIDTYPE_KEY]);
    let n =  Number(res[GRIDTYPE_KEY]);
    if (isNaN(n)) {
        return WEEKS; // reasonable default. 
    } 
    return n;
}