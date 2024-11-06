export interface Budget {
    id: number | null;
    cliente: string;
    vlTotal: number | null;
    dtEntrega: Date | null;
    status: string;
    type: string; 
}