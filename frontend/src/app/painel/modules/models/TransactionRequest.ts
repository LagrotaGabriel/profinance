// TODO MIGRAR PARA OUTRO DIRETÓRIO MAIS APROPRIADO
export interface TransactionRequest {
    description: string;
    value: number;
    expirationDate: string;
    executionDate?: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELED';
    categoryId: string;
}