export interface IObtenerRutaCobradorPorFecha{
    fecha:string,
    cobrador:number
}

export interface IObtenerCuotasPrestamoPorFecha{
    fecha:string,
    id_prestamo:number
}

export interface IObtenerRutaGeneralEmpresaPorFecha{
    fecha:string,
    empresa:number
}

export interface IInfoCuota{
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

export interface IListadoCuotas{
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

export interface IListadoCuotasGeneral{
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
    cobrador:string,
    id_cobrador:number,
    position?:number,
}

export interface IObtenerCuotasPrestamoPorFecha{
    fecha:string,
    id_prestamo:number
}

export interface IAbonoCuota{
    id:number,
    abono:number,
    fecha:string
}

export interface IPagoCuota{
    id_cuota:number,
    id_cobrador:number
}