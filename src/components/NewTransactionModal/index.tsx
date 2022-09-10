import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import {
    Container,
    TransactionTypeContainer,
    RadioBox
} from './styles';

import VectorImg from '../../assets/Vector.svg'
import EntradasImg from '../../assets/Entradas.svg'
import SaidaImg from '../../assets/Saídas.svg'

import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({
    isOpen,
    onRequestClose
}: NewTransactionModalProps) {
    const {createTransactions} = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type , setType] = useState('');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransactions({
            title,
            amount,
            type,
            category,
        }) 

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit')
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
            >
                <img src={VectorImg} alt='Fechar Modal' />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar informação</h2>

                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    type="Number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === 'deposit'}
                        onClick={() => {setType('deposit')}}
                        isActiveColor='green'
                    >
                        <img src={EntradasImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        isActive={type === 'withdraw'}
                        onClick={() => {setType('withdraw')}}
                        isActiveColor='red'
                    >
                        <img src={SaidaImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}