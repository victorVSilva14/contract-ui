import { Client } from "./client.resource";

export interface Budget {
    id: number;
    cliente: Client;
    dtEntrega: Date;
    dtOrcamento: Date;
    dtRetorno: Date;
    dtSaida: Date;
    status: string;
    vlTotal: number;
}