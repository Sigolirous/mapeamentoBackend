function abrePost(id){
    window.location.href = `lerRelato.html?id=${id}`
  }
  
  fetch('http://127.0.0.1:3333/listarRelatos').then(response => response.json()).then(data =>{
    const relatos = data.data
    const container = document.getElementById("relatos")
    for(let i = 0; i < relatos.length; i++){
        let resume = ''
        if(relatos[i].relato.RELATO_MAO_LIVRE.length > 200){
            for (let j = 0; j < 200; j++){
                resume = resume.concat(relatos[i].relato.RELATO_MAO_LIVRE[j])
            }
        }else{
            resume = relatos[i].relato.RELATO_MAO_LIVRE
        }
        const div = document.createElement("div")
        div.innerHTML = `
                    <div class="relato" id="${relatos[i].idBE}">
                      <div class="corpoRelato">
                        <h5 class="dataRelato">${relatos[i].relato.DATA}</h5>
                        <p class="relatoMLivre">${resume}</p>
                        <a href="#" class="lerRelato" id="cardBtn" onclick="abrePost(${relatos[i].idBE})">Veja Mais</a>
                      </div>
                    </div>
                    `
      container.appendChild(div)
    }
  })