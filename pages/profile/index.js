//https://api.github.com/users/Borchoski
const cardProfile = document.querySelector(".cardProfile")


function criaPerfil(element){
    const mainProfile = document.getElementById("mainProfile")
    //mainProfile.innerHTML = ""
    cardProfile.innerHTML = ""
    let section1 = document.createElement("section")
    let img = document.createElement("img")
    let section2 = document.createElement("section")
    let h1 = document.createElement("h1")
    let p = document.createElement("p")

    img.src = element.avatar_url
    h1.innerText = element.name
    p.innerText = element.bio

    section2.classList = ("sec2 flex column justifyCenter gap8")
    section1.classList.add("sec1")

    section1.appendChild(img)
    section2.append(h1, p)

    cardProfile.append(section1, section2)
   
}
setTimeout(criaPerfil(jsonAnalysis("user")), 1000)

async function criaRepos(url){
    const ulRepos = document.getElementById("ulRepos")
    const data = await fetch(url, {
            method: "GET",
            })
            .then(res => res.json())
            .then(res => {
                const repos = res.forEach(element => {

                    let li = document.createElement("li")
                    let h2 = document.createElement("h2")
                    let p = document.createElement("p")
                    let section = document.createElement("section")
                    let a = document.createElement("a")
                    let button1 = document.createElement("button")
                    let button2 = document.createElement("button")
                    
                
                    h2.innerText = element.name
                    p.innerText = element.description
                    if(!element.description){
                        p.innerText = "No description."
                    }
                    button1.innerText = "Repositório"
                    button2.innerText = "Demo"
                    a.href = element.html_url
                    a.target = "_blank"

                
                    li.classList = ("card flex column gap32")
                    section.classList = ("flex gap16")
                    button1.classList.add("butRep")
                    button2.classList.add("butDemo")
                
                    section.append(a, button2)
                    a.appendChild(button1)
                    li.append(h2, p, section)
                    ulRepos.appendChild(li)
                })
            })
            return data
}
criaRepos(reposUrl(jsonAnalysis("user")))
//console.log(reposUrl(jsonAnalysis("user")))

function reposUrl(obj){
    const urlRepos = obj.repos_url
    //console.log(urlRepos)

    return urlRepos
}

