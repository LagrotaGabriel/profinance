export interface TransactionResponse {
    id: string;
    description: string;
    value: string;
    creationTimeStamp: string;
    expirationDate: string;
    executionDate: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELED';
    categoryId: string;
    categoryName: string;
}