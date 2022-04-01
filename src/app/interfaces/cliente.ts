export interface Cliente {
    id_cobrador: number,
    nombre: string,
    cedula: string,
    celular: string,
    direccion: string,
    nombre_fiador: string,
    cedula_fiador: string,
    celular_fiador: string,
    direccion_fiador: string
}


export interface ListadoClientes {
    id:number,
    id_cobrador: number,
    nombre: string,
    cedula: string,
    celular: string,
    direccion: string,
    nombre_fiador: string,
    cedula_fiador: string,
    celular_fiador: string,
    direccion_fiador: string,
    prestamos_activos:number,
    position?:number,
}

export interface EditarInformacionCliente {
     id:number,
     nombre: string,
     cedula: string,
     celular: string,
     direccion: string,
     nombre_fiador: string,
     cedula_fiador: string,
     celular_fiador: string,
     direccion_fiador: string,
}


