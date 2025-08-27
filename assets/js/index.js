// const apiKey = `4cbad31034e53a658c1c7e0a4a344876`
// const url = `https://api.openweathermap.org/data/2.5/weather?units=metrics&q=${city}&appid=${apiKey}`

// Chave da API do OpenWeatherMap
const APIKEY = "4cbad31034e53a658c1c7e0a4a344876"
// URL base da API, já com unidade em métrico
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Seleciona o input de cidade e o botão de busca pelo ID
const searchBox = document.getElementById('city')
const searchBtn = document.getElementById('btn')

// Função assíncrona para buscar e exibir o clima de uma cidade
async function weatherCheck(city) {
    // Faz a requisição para a API com a cidade e a chave
    const res = await fetch(URL + city + `&appid=${APIKEY}`)
    // Converte a resposta para JSON
    const data = await res.json()
    // Exibe os dados no console para depuração
    console.log(data)
    
    // Atualiza o nome da cidade no HTML
    document.querySelector('.city').innerHTML = data.name
    // Atualiza a descrição do clima
    document.querySelector('.description').innerHTML = data.weather[0].description
    // Atualiza a temperatura arredondada
    document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + 'ºC'
    // Atualiza a umidade
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    // Atualiza a velocidade do vento
    document.querySelector('.wind').innerHTML = data.wind.speed  + 'Km/h'
    // Seleciona o elemento de imagem
    const img = document.getElementById('images')


    let imgSrc = '';

    // Usa o código do ícone retornado pela API para exibir a imagem correspondente
    let icon = data.weather[0].icon;
    let imgSrcByIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    img.src = imgSrcByIcon;
}

// Chama a função ao carregar a página (sem cidade definida)
weatherCheck()

// Adiciona evento de clique ao botão para buscar o clima da cidade digitada
searchBtn.addEventListener('click', () => {
    weatherCheck(searchBox.value)
})

// Adiciona evento de clique ao input (deveria ser 'keydown' para capturar Enter)
searchBox.addEventListener('click', (e) => {
    if (e.Key == 'Enter'){
        weatherCheck(searchBox.value)
    }
})