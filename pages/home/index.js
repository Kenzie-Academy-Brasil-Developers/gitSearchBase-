const baseURL = 'https://api.github.com/'
let dataUrlUser = ""
let dataUsers = []

import { jsonAnalysis, verifyJson } from "../js/localStorage.js"

if(jsonAnalysis()){
    dataUsers = jsonAnalysis()
    //console.log(dataUsers)
}

async function butSearchUser(){
    const butUserHome = document.getElementById("butUserHome")
    const inputUserHome = document.getElementById("inputUserHome")
    const secUserNotFound = document.getElementById("secUserNotFound")
    butUserHome.addEventListener("click", async (event) => {
        event.preventDefault()

        try{
            const request = await fetch(baseURL + 'users/' + inputUserHome.value, {
            method: 'GET'})

            .then(res => res.json())
            .then(response => {
                if(response.message){
                    secUserNotFound.innerHTML = ""
                    secUserNotFound.insertAdjacentHTML("beforeend", `
                         <p>Usuário não encontrado</p>
                     `)
                    setTimeout(() => {secUserNotFound.innerHTML = ""},3500)
                }else{
                    secUserNotFound.innerHTML = ""
                    dataUrlUser = ""
                    dataUrlUser = `https://api.github.com/users/${inputUserHome.value}`
                    const searchJson = JSON.stringify(dataUsers)
                    localStorage.setItem("users", searchJson)
                    if(verifyJson(jsonAnalysis("users")) != response.login){
                        dataUsers.push(response)
                    }
                    const userLocarStorage = JSON.stringify(response)
                    localStorage.setItem("user", userLocarStorage)
                    window.location.replace("./index-profile.html")
                }
                console.log(response)
            })

        }catch (err) {
            console.log(err)
        }
        
    })
}
butSearchUser()

function imgUserUpdater(arr){
    const imgUsers = document.querySelectorAll(".imgUser")
    const arrFor = arr.forEach(element => {
        imgUsers.forEach(img => {
            if(img.src != element.avatar_url){
                img.src = element.avatar_url
            }
        })
    })
}
imgUserUpdater(jsonAnalysis("users"))

verifyJson(jsonAnalysis())

function disableBut () {
    const hrefUser = document.getElementById("hrefUser")
    const inputUserHome = document.getElementById("inputUserHome")
    const butUserHome = document.getElementById("butUserHome")

    butUserHome.disabled = true;

    inputUserHome.addEventListener("input", () => {
        let conteudo = inputUserHome.value
        if(conteudo !== null && conteudo !== ''){
            butUserHome.disabled = false;
        }else{
            butUserHome.disabled = true;
        }
    })
}
disableBut()




