import React from 'react'
import {MdSend} from 'react-icons/md'

const ExpenseForm = ({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor='expense'>Pagamento </label>
                    <input type='text' className='form-control' id='chargeId' name='charge' placeholder='Ex: Aluguel' value={charge} onChange={handleCharge}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='expense'>Custo </label>
                    <input type='number' className='form-control' id='amountId' name='amount' placeholder='Ex: 100' value={amount} onChange={handleAmount}></input>
                </div>
            </div>
            <button type='submit' className='btn'>
                {edit? "Editar": "Adicionar"}
            <MdSend className='btn-push'/>
            </button>
        </form>
    );
}

export default ExpenseForm;