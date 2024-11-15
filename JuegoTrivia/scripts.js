function jugar(){
    document.getElementById("pantalla-inicio").classList.add('hidden');
    document.getElementById("pantalla-juego").classList.remove('hidden');
    document.getElementById("pantalla-instrucciones").classList.add('hidden');
    document.getElementById("pantalla-creditos").classList.add('hidden');
    document.getElementById("pantalla-final").classList.add('hidden');
    document.getElementById("pantalla-pierde").classList.add('hidden');
};

function regresarJuego(){
    document.getElementById("pantalla-inicio").classList.remove('hidden');
    document.getElementById("pantalla-juego").classList.add('hidden');
    document.getElementById("pantalla-instrucciones").classList.add('hidden');
    document.getElementById("pantalla-creditos").classList.add('hidden');
    document.getElementById("pantalla-final").classList.add('hidden');
    document.getElementById("pantalla-pierde").classList.add('hidden');
};

function instrucciones(){
    document.getElementById("pantalla-inicio").classList.add('hidden');
    document.getElementById("pantalla-juego").classList.add('hidden');
    document.getElementById("pantalla-instrucciones").classList.remove('hidden');
    document.getElementById("pantalla-creditos").classList.add('hidden');
    document.getElementById("pantalla-final").classList.add('hidden');
    document.getElementById("pantalla-pierde").classList.add('hidden');
};

function creditos(){
    document.getElementById("pantalla-inicio").classList.add('hidden');
    document.getElementById("pantalla-juego").classList.add('hidden');
    document.getElementById("pantalla-instrucciones").classList.add('hidden');
    document.getElementById("pantalla-creditos").classList.remove('hidden');
    document.getElementById("pantalla-final").classList.add('hidden');
    document.getElementById("pantalla-pierde").classList.add('hidden');
};

function final(){
    document.getElementById("pantalla-inicio").classList.add('hidden');
    document.getElementById("pantalla-juego").classList.add('hidden');
    document.getElementById("pantalla-instrucciones").classList.add('hidden');
    document.getElementById("pantalla-creditos").classList.add('hidden');
    document.getElementById("pantalla-final").classList.remove('hidden');
    document.getElementById("pantalla-pierde").classList.add('hidden');
};

function pierde(){
    document.getElementById("pantalla-inicio").classList.add('hidden');
    document.getElementById("pantalla-juego").classList.add('hidden');
    document.getElementById("pantalla-instrucciones").classList.add('hidden');
    document.getElementById("pantalla-creditos").classList.add('hidden');
    document.getElementById("pantalla-final").classList.add('hidden');
    document.getElementById("pantalla-pierde").classList.remove('hidden');
};

let array_preguntas = 
[
    "¿Cuál es la capital de Republica Checa?", "¿Cuál es el río más profundo del mundo?", "¿En que año inicio la revolución francesa?", "¿Cuántas veces ha estado el hombre en la Luna?", "¿Cuál fue la primera civilización humana?", "¿Territorio en el que desembarco Cristóbal Colón?", "¿Cuál es el océano más pequeño del mundo?", "¿Cuál es el continente más extenso del planeta?", "¿Cuántos países oficiales hay en el mundo hoy en día?", "¿Cuál de los siguientes No es un estado de la materia?", "¿De qué país es originario el café?", "¿Cuántos elementos hay en la Tabla Periódica?", "¿Cuántos satélites tiene Saturno?", "¿Cuál es el metal más caro del mundo?", "¿Qué descubrieron Marie Curie y su esposo Pierre Curie?", "¿Cuál es la serpiente más larga del mundo?", "¿Quién descubrió la penicilina?", "¿Qué pigmento da color a nuestra piel?", "¿Quién pintó la Capilla Sixtina?", "¿Cuál es la lengua más hablada del mundo?", "¿Cuál es la capital de Australia?", "¿Cuál NO es una maravilla del mundo antiguo?", "¿Cuál es el primer número primo?", "¿Cómo se llama el libro sagrado del Judaísmo?", "¿Cuántos corazones tiene un pulpo?", "¿Cuál fue el primer ser humano en ir al espacio?", "¿Según la leyenda, ¿quién fundó Roma?", "¿En qué año comenzó la Primera Guerra Mundial?", "¿En qué fecha cayó el Muro de Berlín?", "¿Qué planeta del sistema solar está más lejos del sol?", "¿Qué planeta del sistema solar está más lejos del sol?", "¿Qué planeta del sistema solar está más lejos del sol?", "¿Qué planeta del sistema solar está más lejos del sol?", "¿Qué planeta del sistema solar está más lejos del sol?", "¿Qué planeta del sistema solar está más lejos del sol?"
];

let array_respuestas = 
[
    ["Dublín", "Praga", "Viena", "Kiev"], ["Río Nilo", "Río Misisipi", "Río Amazonas", "Río Congo"], ["1654", "1902", "1789", "1889"], ["1", "3", "4", "6"], ["Los Sumerios", "Los Egipcios", "Los Hebreos", "Los Romanos"], ["Isla de San Andrés", "Isla de Guanahani", "Isla Saona", "Isla Quintín Aráuz"], ["Océano Pacífico", "Océano Índico", "Océano Ártico", "Océano Atlántico"], ["Europa", "África", "América", "Asia"], ["190", "192", "195", "205"], ["Plasma", "Fermiónico", "Gas puro", "Cristal líquido"], ["Etiopía", "China", "Tanzania", "Marruecos"], ["116", "117", "118", "119"], ["78", "82", "87", "122"], ["Oro", "Iridio", "Rodio", "Paladio"], ["La temperatura de Curie", "Entrelazamiento", "La radioactividad", "La resistividad"], ["La pitón de Birmania", "La pitón reticulada", "La anaconda", "La boa constrictor"], ["Alexander Fleming", "Louis Pasteur", "Edward Jenner", "Marie Curie"], ["La melatonina", "La melanina", "La dopamina", "La serotonina"], ["Vincent Van Gogh", "Salvador Dalí", "Leonardo DaVinci", "Miguel Ángel"], ["El español", "El ingles", "El mandarín", "El Japones"], ["Launceston", "Bundaberg", "Sídney", "Canberra"], ["La piramide de Guiza", "El coliseo romano", "El coloso de rodas", "El templo de artemisa"], ["1", "2", "3", "4"], ["El Pentateuco", "El Corán", "La Torá", "Los Sibilinos"], ["1", "2", "3", "4"], ["Yuri Gagarin", "Neil Armstrong", "Laika", "Bill Anders"], ["Rómulo", "Rémulo", "Rámo", "Remo"], ["1913", "1914", "1915", "1916"], ["1969", "1979", "1989", "1999"], ["Saturno", "Urano", "Neptuno", "Júpiter"]
];

let array_respuestas_correctas = 
[
    "Praga", "Río Congo", "1789", "6", "Los Sumerios", "Isla de Guanahani", "Océano Ártico", "Asia", "195", "Gas puro", "Etiopía", "118", "82", "Rodio", "La radioactividad", "La pitón reticulada", "Alexander Fleming", "La melanina", "Miguel Ángel", "El ingles", "Canberra", "El coliseo romano", "2", "La Torá", "3", "Yuri Gagarin", "Rómulo", "1914", "1989", "Neptuno"
];

class trivia{

    generarPregunta(){
        let pregunta = `<h3 class="">${array_preguntas[cont]}</h3>`;

        document.getElementById("contenedor-pregunta").innerHTML = pregunta;
    }

    generarRespuesta(){
        let respuestas = 
        `
        <div class="row justify-content-center">
            <button id="respuesta-1" class="respuesta">${array_respuestas[cont][0]}</button>
            <button id="respuesta-2" class="respuesta margin-medio">${array_respuestas[cont][1]}</button>
        </div>
        <div class="row justify-content-center">
            <button id="respuesta-3" class="respuesta">${array_respuestas[cont][2]}</button>
            <button id="respuesta-4" class="respuesta margin-medio">${array_respuestas[cont][3]}</button>
        </div>
        `;
        document.getElementById("respuestas").innerHTML = respuestas;

        document.getElementById("respuesta-1").addEventListener("click", this.procesarRespuesta);
        document.getElementById("respuesta-2").addEventListener("click", this.procesarRespuesta);
        document.getElementById("respuesta-3").addEventListener("click", this.procesarRespuesta);
        document.getElementById("respuesta-4").addEventListener("click", this.procesarRespuesta);
    }

    procesarRespuesta(event) {
        let seleccion = event.target.textContent;

        if(seleccion == array_respuestas_correctas[cont-1]){
            cont_correctas += 1;
            document.getElementById("puntaje").innerHTML = cont_correctas*5;

            if(cont == array_respuestas_correctas.length){
                final();
            }

            
        }else{
            cont_incorrectas += 1;
            document.getElementById("vidas").innerHTML = 5-cont_incorrectas;

            if(cont_incorrectas == 5){
                pierde();
            }
        }
        
        trivia1.generarPregunta();
        trivia1.generarRespuesta();
        cont += 1;
    }
}

var cont = 0;
var cont_correctas = 0;
var cont_incorrectas = 0;
var trivia1 = new trivia;
document.getElementById("jugar").addEventListener("click", function(){

    trivia1.generarPregunta();
    trivia1.generarRespuesta();
    let intervalo = setInterval(actualizarContador, 1000);

    cont += 1;
});

document.getElementById("salir").addEventListener("click", function(){ 
    location.reload();
});

document.getElementById("salir-2").addEventListener("click", function(){ 
    location.reload();
});

document.getElementById("salir-3").addEventListener("click", function(){ 
    location.reload();
});


let tiempo = 149;
let contadorElemento = document.getElementById("contador");

function actualizarContador(){
  let minutos = Math.floor(tiempo / 60);
  let segundos = tiempo % 60;

  if(segundos < 10){
    segundos = `0${segundos}`;
  }

  contadorElemento.textContent = `${minutos}:${segundos}`;
  tiempo--;

  if(tiempo < 0){
    pierde();
  }
}