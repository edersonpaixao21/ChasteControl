import { createContext, ReactNode, useContext, useEffect, useState, } from 'react'
import { api } from '../services/api';

interface Transactions{
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

interface TransactionsProviderProps {
    children: ReactNode;
}

type TransactionsInput = Omit<Transactions, 'id' | 'createdAt'>;

interface TransactionsContextData {
    transactions: Transactions[];
    createTransactions: (Transactions: TransactionsInput) => Promise<void>;}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [ transactions, setTransactions ] = useState<Transactions[]>([]);

    useEffect(() => {
        api.get ('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransactions(transactionInput: TransactionsInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date (),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}