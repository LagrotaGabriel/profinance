export interface PageResponse<T> {
    content: T;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    size: number;
    totalElements: number;
    totalPages: number;
}