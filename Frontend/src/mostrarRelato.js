const url = window.location.search
const urlQuery = new URLSearchParams(url)
fetch(`http://127.0.0.1:3333/listarUm?id=${urlQuery.get("id")}`).then(response => response.json()).then(data =>{
    const date = document.getElementById("data")
    const local = document.getElementById("local")
    const relato = document.getElementById("relato")
    date.innerText = data.data[0].relato[0].DATA
    local.innerText = data.data[0].relato[0].LOCAL
    relato.innerText = data.data[0].relato[0].RELATO_MAO_LIVRE
})