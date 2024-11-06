export interface Budget {
    id: number | null; // Permite null
    cliente: string;
    vlTotal: number | null; // Permite null
    dtEntrega: Date | null; // Permite null
    status: string;
    type: string; 
}