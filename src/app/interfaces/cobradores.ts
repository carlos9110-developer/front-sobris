export interface Cobradores {
    cedula: string,
    created_at: string,
    empresa_id: number,
    id: number,
    nombre: string
    rol_id: number,
    updated_at: string,
    estado:string,
    celular:string,
    presamos_activos:number,
    position?:number,
}

export interface RegistroCobrador {
    cedula: string,
    empresa_id: number,
    nombre: string
    celular:string,
}