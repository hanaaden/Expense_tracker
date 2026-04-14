import { useEffect, useState } from "react";
import API from "../api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import toast from "react-hot-toast";

function GetExpenses() {
    const [expenses, setExpenses] = useState([]);
    const getExpense = async () => {
  try {
    const result = await API.get('/expenses');
    setExpenses(result.data.data);
  } catch (error) {
    toast.error("Error fetching expenses");
    console.error('Error fetching expenses:', error);
  }
    }
          const handleDeleteTask = async (id : number) => {
        try {
        await API.delete(`/deleteexpense/${id}`)
          getExpense()
        } catch (err) {
          toast.error("Error deleting expense");
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

<div className="flex justify-between gap-4">

  <Link
    to="/add-expense"
    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-4 transition"
  >
    <MdAddCircleOutline className="text-xl" />
    Add Expense
  </Link>

  <Link
    to="/Homepage"
    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-4 transition"
  >
    <AiOutlineHome className="text-xl" />
    Home
  </Link>

</div>
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
