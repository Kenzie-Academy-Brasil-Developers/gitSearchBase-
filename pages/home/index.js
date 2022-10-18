//https://api.github.com
let dataUsers = []
let dataUrlUser = ""

if(jsonAnalysis()){
    dataUsers = jsonAnalysis()
    //console.log(dataUsers)
}

function butSearchUser(){
    //const hrefUser = document.getElementById("hrefUser")
    const butUserHome = document.getElementById("butUserHome")
    const inputUserHome = document.getElementById("inputUserHome")
    const secUserNotFound = document.getElementById("secUserNotFound")
    butUserHome.addEventListener("click", async (event) => {
        event.preventDefault()
        const data = await fetch(`https://api.github.com/users/${inputUserHome.value}`, {
            method: "GET",
            })
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                if(res.message != 'Not Found'){
                    secUserNotFound.innerHTML = ""
                    dataUrlUser = ""
                    dataUrlUser = `https://api.github.com/users/${inputUserHome.value}`
                    const searchJson = JSON.stringify(dataUsers)
                    localStorage.setItem("users", searchJson)
                    if(verifyJson(jsonAnalysis("users")) != res.login || jsonAnalysis().length == 0){
                        dataUsers.push(res)
                    }

                    localStorage.removeItem("user")
                    const userLocarStorage = JSON.stringify(res)
                    localStorage.setItem("user", userLocarStorage)

                    //window.location.replace("http://127.0.0.1:5500/index-profile.html")
                    //setTimeout(criaPerfil(jsonAnalysis("user")), 1000)
                }else{
                    console.log("erro")
                    secUserNotFound.innerHTML = ""
                    secUserNotFound.insertAdjacentHTML("beforeend", `
                        <p>Usuário não encontrado</p>
                    `)
                }
                //console.log(dataUrlUser)
                //console.log(dataUsers)
                
                return res
            })
            .catch(err => console.log(err))
            return data
        
    })
}
butSearchUser()

function imgUserUpdater(arr){
    let imgUsers = document.querySelectorAll(".imgUser")
    const arrFor = arr.forEach(element => {
        imgUsers.forEach(img => {
            if(img.src != element.avatar_url){
                img.src = element.avatar_url
            }
        })
    })
}
imgUserUpdater(jsonAnalysis("users"))

function jsonAnalysis(key){
    const jsonLocalStorage = localStorage.getItem(key)
    if(jsonLocalStorage){
        const localStorageObj = JSON.parse(jsonLocalStorage)

        
        //console.log(localStorage)
        return localStorageObj
    }
    
}
//console.log(jsonAnalysis("users"))

function verifyJson(arr){
    if(arr){
        const verify = arr.forEach(element => element.login)
    }
}
//verifyJson(jsonAnalysis())






