/* ==========================================================================
   RECURSO PARA ESTUDIANTES - EVALUACIÓN JAVASCRIPT
   Dashboard de Torneos Gamer
   ========================================================================== */

// Actividad 3. Declarar el arreglo (10 puntos)
// Declarar un arreglo global vacío llamado torneos.
// Cada elemento deberá ser un objeto con las propiedades:
// nombre, categoria, participantes, valorInscripcion, email y recaudacion.
let torneos = [];
let indiceEdicion = -1; 

/**
 * Actividad 4. Registrar y validar un torneo (30 puntos)
 * 12. Crear la función registrarTorneo() sin parámetros.
 */
function registrarTorneo() {
    // 13. Obtener los valores de todos los campos con document.getElementById()

    let cmpNombre = document.getElementById("txtNombreTorneo");
    let cmpCategoria = document.getElementById("txtCategoria");
    let cmpParticipantes = document.getElementById("txtParticipantes");
    let cmpValorInscripcion = document.getElementById("txtValorInscripcion");
    let cmpEmail = document.getElementById("txtEmail");

    let nombre = cmpNombre.value;
    let categoria = cmpCategoria.value;
    let participantes = parseInt(cmpParticipantes.value);
    let valorInscripcion = parseInt(cmpValorInscripcion.value);
    let email = cmpEmail.value;

    let errorValidacion = false;

    let cmpErrorNombre = document.getElementById("txtNombreTorneoError");
    let cmpErrorCategoria = document.getElementById("txtCategoriaError");
    let cmpParticipantesError = document.getElementById("txtParticipantesError");
    let cmpValorInscripcionError = document.getElementById("txtValorInscripcionError");
    let cmpEmailError = document.getElementById("txtEmailError");
    let cmpRegistro = document.getElementById("txtRegistro");

    // 14. Validar que el nombre tenga al menos 4 caracteres
    if (nombre.length < 4) {
        cmpErrorNombre.innerText = "*El nombre debe tener almenos 4 caractéres";
        errorValidacion = true;
    } else {
        cmpErrorNombre.innerText = "";
    }

    // 15. Validar que se haya seleccionado una categoría
    //Lucha, Estrategia, Arcade, Deportes, Aventura
    if (categoria != "Lucha" &&
        categoria != "Estrategia" &&
        categoria != "Arcade" &&
        categoria != "Deportes" &&
        categoria != "Aventura") {
        cmpErrorCategoria.innerText = "*Categoría no válida \n (Lucha, Estrategia, Arcade, Deportes, Aventura)";
        errorValidacion = true;
    } else {
        cmpErrorCategoria.innerText = "";
    }

    // 16. Validar que los participantes sean un entero entre 1 y 100
    if (participantes >= 1 && participantes <= 100) {
        cmpParticipantesError.innerText = ""
    } else {
        cmpParticipantesError.innerText = "*Número de participantes no válido \n (1 a 100)";
        errorValidacion = true;
    }

    // 17. Validar que el valor de inscripción sea mayor que 0
    if (valorInscripcion > 0) {
        cmpValorInscripcionError.innerText = ""
    } else {
        cmpValorInscripcionError.innerText = "*Valor de inscripción no válido";
        errorValidacion = true;
    }

    // 18. Validar que el email no esté vacío. No se requiere validación avanzada de formato.
    if (email.length <= 0) {
        cmpEmailError.innerText = "*Correo vacío";
        errorValidacion = true;
    } else {
        cmpEmailError.innerText = ""
    }

    // Si alguna validación falla, mostrar mensajes de error y detener la ejecución

if (errorValidacion) {
    cmpRegistro.innerText = "*Registro no completado*";
    cmpRegistro.classList.remove("mensajeExito");
    cmpRegistro.classList.add("mensajeError");
    return;
}

    // 19. Calcular la recaudación estimada con: participantes × valor de inscripción

    let recaudacionEstimada = participantes * valorInscripcion;

    // 20. Crear el objeto nuevoTorneo con los datos obtenidos

    let nuevoTorneo = {
        nombreTorneo: nombre,
        categoriaTorneo: categoria,
        participantesTorneo: participantes,
        valorInscripcionTorneo: valorInscripcion,
        emailTorneo: email,
        recaudacionEstimadaTorneo : recaudacionEstimada
    };

    // 21. Agregar el objeto al arreglo con push()
    torneos.push(nuevoTorneo);

    // 22. Llamar a mostrarTorneos() y limpiarFormulario()
    mostrarTorneos();
    limpiarFormulario();

    // 23. Mostrar un mensaje de registro exitoso
    cmpRegistro.innerText = "*Registo Exitoso*";
cmpRegistro.classList.remove("mensajeError");
cmpRegistro.classList.add("mensajeExito");
}

/**
 * Actividad 5. Mostrar los torneos (15 puntos)
 * 24. Crear la función mostrarTorneos() sin parámetros.
 */
function mostrarTorneos() {
    // 25. Crear una variable vacía para concatenar el HTML
    let contenido = "";

    // 26. Recorrer el arreglo torneos utilizando obligatoriamente un ciclo for
    // 27. En cada vuelta, obtener el objeto actual y construir una fila de la tabla (<tr>...</tr>)
    // 28. Mostrar todos los datos y la recaudación calculada

    let cmpTabla = document.getElementById("tablaContenido");
    for (let i = 0; i < torneos.length; i++) {
        contenido += "<tr>" +
            "<td>" + torneos[i].nombreTorneo + "</td>" +
            "<td>" + torneos[i].categoriaTorneo + "</td>" +
            "<td>" + torneos[i].participantesTorneo + "</td>" +
            "<td>" + torneos[i].valorInscripcionTorneo + "</td>" +
            "<td>" + torneos[i].emailTorneo + "</td>" +
            "<td>" + torneos[i].recaudacionEstimadaTorneo + "</td>" +
            "</tr>"
    }

    // 29. Insertar el HTML final en el cuerpo de la tabla sin duplicar filas (usando innerHTML)
    cmpTabla.innerHTML = contenido;
}

/**
 * Actividad 6. Limpiar el formulario (5 puntos)
 * 30. Crear la función limpiarFormulario().
 */
function limpiarFormulario() {
    // 31. Vaciar los campos del formulario, restablecer la categoría y limpiar los mensajes de error
    let cmpNombre = document.getElementById("txtNombreTorneo");
    let cmpCategoria = document.getElementById("txtCategoria");
    let cmpParticipantes = document.getElementById("txtParticipantes");
    let cmpValorInscripcion = document.getElementById("txtValorInscripcion");
    let cmpEmail = document.getElementById("txtEmail");

    cmpNombre.value = "";
    cmpCategoria.value = "Lucha";
    cmpParticipantes.value = "";
    cmpValorInscripcion.value = "";
    cmpEmail.value = "";
}

function editarTorneo(indice){
    
}
