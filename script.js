const chave = "coloque sua chave wheater api gratis aqui";
const accessKey = "aqui a chave do unsplash";
const entrada=document.querySelector('.entradaCidade');
const botao=document.querySelector('.btnEnviar');
const tempo=document.querySelector('.tempo')
const cidade=document.querySelector('.cidade')
const temperatura=document.querySelector('.temperatura')
let ceu = "Summer"


botao.addEventListener('click',()=>{
    if(entrada.value==''){
        window.alert('Digite uma cidade')
    } else {
        let cidadeRecebida=entrada.value
        entrada.value=''
        buscar(cidadeRecebida)
    }

})



async function buscar(cidadeRecebida){


    try {
        let testando = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cidadeRecebida}&appid=${chave}&units=metric&lang=${"pt_br"}`).then(resposta=>resposta.json())

        console.log(testando)
        
        mostrar(testando)
        if(testando.weather[0].main=="Rain"){
            ceu="rainy sky"
            carregarImagemDeFundo(ceu)
        } else if (testando.weather[0].main=="Clouds"){
            ceu="cloudy sky"
            carregarImagemDeFundo(ceu)
        }   
        else{
            carregarImagemDeFundo(ceu)
        }
    } catch (erro){
        window.alert('cidade invalida')
    }
}

function mostrar(testando){
    console.log(testando.weather[0].description)

    cidade.innerHTML=testando.name;
    temperatura.innerHTML= `${testando.main.temp}°C`;
    tempo.innerHTML="Céu&nbsp;"+testando.weather[0].description;
    
}





async function carregarImagemDeFundo(tempo) {
  try {
    const resposta = await fetch(`https://api.unsplash.com/photos/random?query=${ceu}&orientation=landscape&client_id=${accessKey}`);
    const dados = await resposta.json();


    const urlImagem = dados.urls.full;

    document.body.style.background = `url(${urlImagem}) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";

    console.log("Imagem carregada:", urlImagem);
  } catch (erro) {
    console.error("Erro ao carregar imagem:", erro);
  }
}

// Chama ao carregar a página
 carregarImagemDeFundo();