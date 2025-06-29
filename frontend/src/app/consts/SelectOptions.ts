export interface SelectOptions {
    text: string;
    value: string;
}

export const STATUS_CRIACAO_TRANSACAO: SelectOptions[] = [
    {
        text: 'Pendente',
        value: 'PENDING'
    },
    {
        text: 'Paga',
        value: 'COMPLETED'
    }
]