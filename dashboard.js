/* ==========================================================================
   RECURSO PARA ESTUDIANTES - EVALUACIÓN JAVASCRIPT
   Dashboard de Torneos Gamer
   ========================================================================== */

// Actividad 3. Declarar el arreglo (10 puntos)
// Declarar un arreglo global vacío llamado torneos.
// Cada elemento deberá ser un objeto con las propiedades:
// nombre, categoria, participantes, valorInscripcion, email y recaudacion.
let torneos = [
    {
        nombreTorneo: "FIFA",
        categoriaTorneo: "Deportes",
        participantesTorneo: 20,
        valorInscripcionTorneo: 5,
        emailTorneo: "contacto@fifa.com",
        recaudacionEstimadaTorneo: 100
    },
    {
        nombreTorneo: "Valorant",
        categoriaTorneo: "Estrategia",
        participantesTorneo: 30,
        valorInscripcionTorneo: 15,
        emailTorneo: "contacto@valorant.com",
        recaudacionEstimadaTorneo: 450
    },
    {
        nombreTorneo: "Clash Royale",
        categoriaTorneo: "Estrategia",
        participantesTorneo: 100,
        valorInscripcionTorneo: 10,
        emailTorneo: "contacto@clashroyale.com",
        recaudacionEstimadaTorneo: 1000
    },
    {
        nombreTorneo: "Smash Bros",
        categoriaTorneo: "Lucha",
        participantesTorneo: 32,
        valorInscripcionTorneo: 12,
        emailTorneo: "contacto@smashbros.com",
        recaudacionEstimadaTorneo: 384
    }
];

let indiceEdicion = -1;
let estado = "";
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
        recaudacionEstimadaTorneo: recaudacionEstimada
    };

    if (estado != "editar") {
        // 21. Agregar el objeto al arreglo con push()
        torneos.push(nuevoTorneo);
        // 22. Llamar a mostrarTorneos() y limpiarFormulario()

    } else {
        torneos[indiceEdicion]=nuevoTorneo;
    }

    buscarTorneos();
    limpiarFormulario();

    // 23. Mostrar un mensaje de registro exitoso
    cmpRegistro.innerText = "*Registo Exitoso*";
    cmpRegistro.classList.remove("mensajeError");
    cmpRegistro.classList.add("mensajeExito");

    actualizarEstadisticas();
}

/**
 * Actividad 5. Mostrar los torneos (15 puntos)
 * 24. Crear la función mostrarTorneos() sin parámetros.
 */
function mostrarTorneos() {
    let contenido = "";
    let cmpTabla = document.getElementById("tablaContenido");

    for (let i = 0; i < torneos.length; i++) {
        if (!coincideBusqueda(torneos[i])) {
            continue;
        }

        contenido += "<tr>" +
            "<td>" + torneos[i].nombreTorneo + "</td>" +
            "<td>" + torneos[i].categoriaTorneo + "</td>" +
            "<td>" + torneos[i].participantesTorneo + "</td>" +
            "<td>" + torneos[i].valorInscripcionTorneo + "</td>" +
            "<td>" + torneos[i].emailTorneo + "</td>" +
            "<td>" + torneos[i].recaudacionEstimadaTorneo + "</td>" +
            "<td>" +
            "<button class='botonEditar' onclick='editarTorneo(" + i + ")'>Editar</button>" +
            "<button class='botonEditar' onclick='eliminarTorneo(" + i + ")'>Eliminar</button>" +
            "</td>" +
            "</tr>"
    }

    cmpTabla.innerHTML = contenido;
}

function generarTarjetas() {
    let contenido = "";
    let contenedor = document.getElementById("contenedorTarjetas");

    for (let i = 0; i < torneos.length; i++) {
        let torneo = torneos[i];
        if (!coincideBusqueda(torneo)) {
            continue;
        }

        contenido +=
            "<article class='tarjetaTorneo'>" +
            "<h3>" + torneo.nombreTorneo + "</h3>" +
            "<p><span>Categoría</span><strong>" + torneo.categoriaTorneo + "</strong></p>" +
            "<p><span>Participantes</span><strong>" + torneo.participantesTorneo + "</strong></p>" +
            "<p><span>Valor de inscripción</span><strong>$" + torneo.valorInscripcionTorneo + "</strong></p>" +
            "<p><span>Recaudación</span><strong>$" + torneo.recaudacionEstimadaTorneo + "</strong></p>" +
            "</article>";
    }

    contenedor.innerHTML = contenido;
}

function coincideBusqueda(torneo) {
    let textoBusqueda = document.getElementById("txtBuscarTorneo").value.trim().toLowerCase();
    return torneo.nombreTorneo.toLowerCase().includes(textoBusqueda) ||
        torneo.categoriaTorneo.toLowerCase().includes(textoBusqueda);
}


function buscarTorneos() {
    mostrarTorneos();
    generarTarjetas();
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


function editarTorneo(indice) {
    let torneo = torneos[indice];
    estado = "editar";
    limpiarFormulario();
    document.getElementById("txtNombreTorneo").value = torneo.nombreTorneo;
    document.getElementById("txtCategoria").value = torneo.categoriaTorneo;
    document.getElementById("txtParticipantes").value = torneo.participantesTorneo;
    document.getElementById("txtValorInscripcion").value = torneo.valorInscripcionTorneo;
    document.getElementById("txtEmail").value = torneo.emailTorneo;

    indiceEdicion = indice;
    document.getElementById("btnGuardarTorneo").value = "ACTUALIZAR TORNEO";
    document.getElementById("txtRegistro").innerText = "";
    document.getElementById("txtRegistro").classList.remove("mensajeError", "mensajeExito");
    document.getElementById("txtNombreTorneo").focus();

    actualizarEstadisticas();
}

function actualizarEstadisticas() {
    let totalParticipantes = 0;
    let recaudacionTotal = 0;

    for (let i = 0; i < torneos.length; i++) {
        totalParticipantes += torneos[i].participantesTorneo;
        recaudacionTotal += torneos[i].recaudacionEstimadaTorneo;
    }

    document.getElementById("totalTorneos").innerText = torneos.length;
    document.getElementById("totalParticipantes").innerText = totalParticipantes;
    document.getElementById("recaudacionTotal").innerText = recaudacionTotal; 
}


function eliminarTorneo(indice){
    if (!confirm("¿Desea eliminar este torneo?")) {
        return;
    }

    torneos.splice(indice,1);
    buscarTorneos();
    actualizarEstadisticas();
}

buscarTorneos();
actualizarEstadisticas();