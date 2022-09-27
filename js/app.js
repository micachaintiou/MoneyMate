const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500),
];

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos = () =>{
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}


let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-AR',{style:'percent',minimumFractionDigits:2})
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresosHTML=`
    <div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-outline"
                            onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
            `;
            return ingresosHTML;
}

const eliminarIngreso = (id) => {
    let inidiceEliminar = ingresos.findIndex(ingreso=> ingreso.id === id); //Es muy parecido a hacer un for
    //for(let ingreso of ingresos)
    ingresos.splice(inidiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();

}

const cargarEgresos = () =>{
    let egresoHTML = '';
    for(let egreso of egresos){
        egresoHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresoHTML;
}



const crearEgresoHTML = (egreso) =>{
    let egresoHTML=`
<div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-outline"
                                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
                `;
                return egresoHTML;
}

let eliminarEgreso = (id) =>{
    let inidiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(inidiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value)); //El + convierte una cadena en un valor numerico
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value) );
            cargarCabecero();
            cargarApp();
        }
    }
}