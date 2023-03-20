import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';

const ExpenseItem = ({expense, handleEdit, handleDelete}) => {
    const {id, charge, amount} = expense
    return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>
                    {charge}
                </span>
                <span className='amount'> R${amount} </span>
                <button className='btn-edit' aria-label='edit button' onClick={() => handleEdit(id)}> 
                <MdEdit />
                </button>
                <button className='btn-delete' aria-label='delete button' onClick={() =>handleDelete(id)}> 
                <MdDelete />
                </button>
            </div>
        </li>
    );
}

export default ExpenseItem;