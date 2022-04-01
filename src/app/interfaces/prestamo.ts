import { Cliente } from './cliente';
export interface Prestamo {
    frecuencia: string,
    prestamo:  number,
    cuotas: number,
    interes: number
}

export interface PrestamoCliente {
    cliente:Cliente,
    prestamo:Prestamo
}

export interface PrestamoClienteRegistrado{
    frecuencia: string,
    prestamo:  number,
    cuotas: number,
    interes: number,
    id_cliente:number,
    id_cobrador:number
}


export interface ListaPrestamos {
    id_cliente:number,
    cliente:string,
    celular:string,
    direccion:string,
    id_prestamo:number,
    valor:number,
    abonado:number,
    valor_cuota:number,
    cuotas:number,
    cuotas_canceladas:number,
    debe:number,
    position?:number
}