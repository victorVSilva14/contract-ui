import { Produto } from "./product.resource";
import { Budget } from "./budget.resource";

export interface ItemsBudget {
    Orcamento: Budget;
    produto: Produto;
    quantidade: number;
    pVenda: number;
}