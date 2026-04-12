import { useEffect, useState } from "react";
import API from "../api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

function GetExpenses() {
    const [expenses, setExpenses] = useState([]);
    const getExpense = async () => {
  try {
    const result = await API.get('/expenses');
    setExpenses(result.data.data);
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
    }
          const handleDeleteTask = async (id : number) => {
        try {
        await API.delete(`/deleteexpense/${id}`)
          getExpense()
        } catch (err) {
          console.log("error found when deleting" , err)
        }
      }

    useEffect(()=>{
        getExpense()
    },[])
  return (
   <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">

  <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
    Your Expenses
  </h2>
<button
  
  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg mb-4"
>
  <Link to="/add-expense">Add Expense</Link>
</button>

  <ul className="space-y-4 max-w-2xl mx-auto">
    {expenses.map((expense: any) => (
      <li
        key={expense.id}
        className="bg-white shadow-lg rounded-xl p-4 border border-green-200 flex justify-between items-center"
      >
        <div>
          <p className="text-lg font-bold text-green-700">
            {expense.description}
          </p>

          <p className="text-gray-700">
            Amount: <span className="font-semibold">${expense.amount}</span>
          </p>

          <p className="text-sm text-gray-500">
            Category: <span className="text-green-600 font-medium">{expense.category}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleDeleteTask(expense.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
          >
            <FiTrash2 size={18} />
          </button>

          <Link to={`/updateexpense/${expense.id}`}>
            <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">
              <FiEdit size={18} />
            </button>
          </Link>
        </div>
      </li>
    ))}
  </ul>
</div>
  )
}

export default GetExpenses
