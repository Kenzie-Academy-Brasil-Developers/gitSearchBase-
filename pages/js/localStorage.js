function verifyJson(arr){
    if(arr){
        const verify = arr.forEach(element => element.login)
    }
}

function jsonAnalysis(key){
    const jsonLocalStorage = localStorage.getItem(key)
    if(jsonLocalStorage){
        const localStorageObj = JSON.parse(jsonLocalStorage)

        
        //console.log(localStorage)
        return localStorageObj
    }
    
}

export {
    jsonAnalysis,
    verifyJson
}