
let listaEmpleados=[];

// crecaion de objeto
const objEmpleado={
    id:'',
    nombre:'',
    apellido:'',
    edad:''
}

let editar=false;

// relacionando las constantes que ingresaran en formulario html
const formulario=document.querySelector('#formulario');
const nombreInput=document.querySelector('#nombre');
const apellidoInput=document.querySelector('#apellido');
const edadInput=document.querySelector('#edad');
const btnEnviar=document.querySelector('#btnEnviar');

formulario.addEventListener('submit',validarFormulario);

function validarFormulario(e){
    // funcion: event.preventDefault()
    e.preventDefault();
    if (nombreInput.value==='' || apellidoInput.value ===''){
        alert('Por favor complete los campos');
        return;
    }

    if (editar){
        editarPersona();
        editar=false;
    } else{
        objEmpleado.id=Date.now();
        objEmpleado.nombre=nombreInput.value;
        objEmpleado.apellido=apellidoInput.value;
        objEmpleado.edad=edadInput.value;
        agregandoPersona();
    }  
}

function agregandoPersona(){
    // PUSH - agregar valores
    listaEmpleados.push({...objEmpleado});
    // Mostrar
    mostrarPersona();
    formulario.reset();
    limpiarObjetos();
}

function limpiarObjetos(){
    objEmpleado.id='';
    objEmpleado.nombre='';
    objEmpleado.apellido='';
    objEmpleado.edad='';
}
function mostrarPersona(){
    limpiarHtml();
    // querySelector
    const divEmpleado=document.querySelector('.div-empleados');  // punto para clases y # para valores normales

    listaEmpleados.forEach(persona => {
      const {id, nombre, apellido, edad}=persona;
      // 1JavierNunjar50

      //crear parrafo que muestra listado ordenado
      const parrafo=document.createElement('p');
      parrafo.textContent=`${id} - ${nombre} - ${apellido} - ${edad} -`;
      parrafo.dataset.id=id;

      // crear botones 
      const editarBoton=document.createElement('button');
      editarBoton.onclick=() => cargarEmpleado(persona);
      editarBoton.textContent='Editar';
      editarBoton.classList.add('btn','btn-editar');
      parrafo.append(editarBoton); // coloca el boton al costado de registro


      const eliminarBoton=document.createElement('button');
      eliminarBoton.onclick =() => eliminarEmpleado(id);// elimina con respecto al id
      eliminarBoton.textContent='Eliminar';
      eliminarBoton.classList.add('btn','btn-eliminar');
      parrafo.append(eliminarBoton); // coloca el boton al costado de registro

     const hr = document.createElement('hr');
     divEmpleado.appendChild(parrafo);
     divEmpleado.appendChild(hr);
    })
}

function cargarEmpleado(persona){
    const {id, nombre, apellido, edad}=persona;
    nombreInput.value=nombre;
    apellidoInput.value=apellido;
    edadInput.value=edad;
    objEmpleado.id=id;
    formulario.querySelector('button[type="submit"]').textContent='Actualizar'; 
    //crea boton desde formulario mismo
    editar = true;
   
}
function editarPersona(){
        objEmpleado.nombre=nombreInput.value;
        objEmpleado.apellido=apellidoInput.value;
        objEmpleado.edad=edadInput.value;
        
        listaEmpleados.map(persona=>{
            if(persona.id=== objEmpleado.id){
                // persona.id=objEmpleado.id;
                persona.nombre=objEmpleado.nombre;
                persona.apellido=objEmpleado.apellido;
                persona.edad=objEmpleado.edad;
            }
        }); 
        limpiarHtml();
        mostrarPersona();
        formulario.reset();
        formulario.querySelector('button[type="submit"]').textContent='Enviar'; 
    // crea boton desde formulario mismo
    editar = false;
}
function eliminarEmpleado(id){
    listaEmpleados=listaEmpleados.filter(empleado=>empleado.id !==id);
    limpiarHtml();
    mostrarPersona();
}
function limpiarHtml(){
    const divEmpleado=document.querySelector('.div-empleados');
    while (divEmpleado.firstChild) {
        divEmpleado.removeChild(divEmpleado.firstChild);
}
} 