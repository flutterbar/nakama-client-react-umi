


export function getLocalStore(key: string): string {
   
    const value = localStorage.getItem(key)
    console.log("*****从LocalStore获得key",key,"value",value)
    return value
}

export function setLocalSore(key: string, value: object) {
    const jsonValue = JSON.stringify(value)
    console.log("*****存储LocalStore的key",key,"value",jsonValue)
    localStorage.setItem(key, jsonValue)
}