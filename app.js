    //Variables
    let numeroSecreto = 0;
    let intentos = 0;
    let listaNumerosSorteados= [];
    let numeroLimite = 10;
    let maximoDeIntentos = 3;
    // interactúa con elementos HTML
    function asignarTextoElemento(elemento, texto){
        let elementoHTML = document.querySelector(elemento);
        elementoHTML.innerHTML = texto;
        return;
    }

    function removerAtributo(id, atributo){
        document.querySelector(id).removeAttribute(atributo);
    }

    function añadirAtributo(id, atributo, boolean){
        document.querySelector(id).setAttribute(atributo, boolean);
    }
    // Evento del botón Intentar
    function verificarIntento(){ 

        //Guarda elnúmero digitado por el usuario
        let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

        console.log(intentos);
        //El usuario acertó el número
        if (numeroSecreto === numeroDeUsuario) {
            asignarTextoElemento('p', `acertaste el número en ${intentos} ${(intentos == 1) ? 'intento' :'intentos'}`)
            //Habilita el botón Nuevo juego
            removerAtributo('#reiniciar', 'disabled');
            //El usuario no acertó el número
        } else {
            //Pistas para acertar el número
            if (numeroSecreto > numeroDeUsuario) {
                asignarTextoElemento('p', 'El número  es mayor');
            } else {
                asignarTextoElemento('p', 'El número es menor');
            }

            //Terminar el juego al alcanzar el máximo de intentos
            if (intentos == maximoDeIntentos) {
                asignarTextoElemento('p', 'Has alcanzado el máximo de intentos, vuelve a empezar');
                añadirAtributo('#intento', 'disabled', 'true');
            }
            //Incremento de intentos
            intentos++;

            //Llamado a la función para borrar número de usuario
            limpiarCaja();
        }
        return;
    }
    // Función que sirve para retomar valores iniciales
    function condicionesIniciales() {
        asignarTextoElemento('h1', 'Juego del número secreto!');
        asignarTextoElemento('p', `Indica un número del 1 al ${numeroLimite}`);
        numeroSecreto = generarNumeroSecreto();
        intentos = 1;
    }

    // Evento del botón Nuevo juego
    function reiniciarJuego(){
        //Limpiar caja
        limpiarCaja();

        //Indicar el mensaje de intervalo de números
        //Generar el número aleatorio
        //Inicializar el número de intentos
        condicionesIniciales()

        //Deshabilitar el botón nuevo juego
        añadirAtributo('#reiniciar', 'disabled', 'true');
        // Habilitar el botón Intentar
        removerAtributo('#intento', 'disabled');
    }

    //Borra el número que digitó el usuario para realizar otro intento
    function limpiarCaja() {
        document.querySelector("#valorUsuario").value = ''; // El # apunta hacia el id
    }
    //Genera un número aleatorio
    function generarNumeroSecreto() {
        let numeroGenerado =  Math.floor(Math.random() * numeroLimite)+1;  
        console.log(numeroGenerado);
        console.log(listaNumerosSorteados);
        // Si el usuario ya sorteó todos los números
        if (listaNumerosSorteados.length == numeroLimite) {
            asignarTextoElemento('p', 'ya se sortearon todos los números posibles')
        }  else{
            // Si el numero generado está en la lista
            if (listaNumerosSorteados.includes(numeroGenerado)) {
                return generarNumeroSecreto();
                //Si no está en la lista 
            } else {
                listaNumerosSorteados.push(numeroGenerado);
                return numeroGenerado;
            }
        }
    }

    condicionesIniciales();
    
   
