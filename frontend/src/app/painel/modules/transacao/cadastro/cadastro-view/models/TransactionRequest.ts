export interface TransactionRequest {
    description: string;
    value: number;
    expirationDate: string;
    executionDate?: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELED';
    categoryId: string;
}