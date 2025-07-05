export interface SelectOptions {
    text: string;
    value: string;
}

export const STATUS_TRANSACAO: SelectOptions[] = [
    {
        text: 'Pendente',
        value: 'PENDING'
    },
    {
        text: 'Paga',
        value: 'COMPLETED'
    }
]

export const TIPO_CATEGORIA: SelectOptions[] = [
    {
        text: 'Entrada',
        value: 'INPUT'
    },
    {
        text: 'Saída',
        value: 'OUTPUT'
    }
]