export interface ObtenerRutaCobradorPorFecha{
    fecha:string,
    cobrador:number
}

export interface ObtenerCuotasPrestamoPorFecha{
    fecha:string,
    id_prestamo:number
}

export interface InfoCuota{
    celular: string,
    created_at: string,
    direccion: string,
    estado: string
    fecha: string,
    fecha_nueva: string,
    id: number,
    id_prestamo: number,
    nombre: string,
    updated_at: string,
    valor_abonado: number,
    valor_cuota: number,
    valor_total: number,
    position?:number,
}

export interface ListadoCuotas{
    created_at: string,
    estado: string
    fecha: string,
    fecha_nueva: string,
    id: number,
    id_prestamo: number,
    id_cliente: number,
    nombre: string,
    updated_at: string,
    valor_abonado: number,
    valor_cuota: number,
    valor_total: number,
    position?:number,
}

export interface AbonoCuota{
    id:number,
    abono:number,
    fecha:string
}

export interface PagoCuota{
    id_cuota:number,
    id_cobrador:number
}