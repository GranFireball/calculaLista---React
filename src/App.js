import React, {useState, useEffect} from 'react'
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import { v4 as uuidv4 } from 'uuid';


/*const initialExpenses = [
  {id: uuidv4(), charge: "rent", amount: 1000},
  {id: uuidv4(), charge: "car", amount: 600},
  {id: uuidv4(), charge: "food", amount: 100}
]
*/
const initialExpenses = localStorage.getItem("expenses")? JSON.parse(localStorage.getItem('expenses')): [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show:false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAlert =({type, text}) => {
    setAlert({show:true, type, text})
    setTimeout(() => {
      setAlert({show:false})
    }, 5000)
  }
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      if(edit){
        let editExpense = expenses.map(item => {
          return item.id === id? {...item, charge, amount}: item;
        });
        setExpenses(editExpense);
        setEdit(false);
        handleAlert({type:'success', text:'Item editado!'});
      }
      else{
        const singleExpense = {id: uuidv4(), charge, amount};
        setExpenses([...expenses, singleExpense]);
        handleAlert({type:'success', text:'Item adicionado!'})
      }
      
      setCharge("");
      setAmount("");
    }
    else{
      handleAlert({type:'danger', text:'Necessário preencher (Pagamento) e (Custo) tem que ser maior que 0!'})
    }
  }

  const excluirTudo = () => {
    setExpenses([]);
    handleAlert({type:'danger', text:'Todos os itens foram excluídos!'})
  }
  const handleDelete = id => {
    let newExpenses = expenses.filter(item => item.id !== id);
    setExpenses(newExpenses);
    handleAlert({type:'danger', text:'Item excluído!'})
  }
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  return (
    <> 
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert/>  
      <main className='App'>
        <h1>Contas a Pagar</h1>
        <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}/>
        <ExpenseList expenses={expenses} handleEdit={handleEdit} handleDelete={handleDelete} excluirTudo={excluirTudo}/>
        <h1>
        Total: <span className='Total'>
          R${expenses.reduce((acc, curr) => {
            return acc += parseFloat(curr.amount);
          }, 0)}
        </span>
      </h1>
      </main>

    </> 
   
  );
}

export default App;

