export interface ITransactionEntity {
    categoryCode?: string;
    dates?: {
        valueDate?: any
    };
    transaction?: {
        amountCurrency?: {
            amount?: any,
            currencyCode?: string
        },
        type?: string,
        creditDebitIndicator?: string
    };
    merchant?: {
        name?: string,
        accountNumber?: string
    };
}
