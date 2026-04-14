import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import API from "../api";
import { BiUser } from "react-icons/bi";

function HomePage() {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    const fetchCategories = async () => {
        try {
            const res = await API.get('/categories');
            setCategories(res.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []); 
  return (
    
   <div className="min-h-screen bg-green-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">
          Expense Tracker
        </h1>

        <h2 className="text-center text-green-500 mb-6">
          Welcome to your expense tracker
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <Link
            to="/add-expense"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            Add Expense
          </Link>

          <Link
            to="/expenses"
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-semibold"
          >
            View Expenses
          </Link>

          <Link
            to="/profile"
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-semibold"
          >
              <BiUser className="text-2xl text-white" />
            profile
          </Link>
        </div>

        <h3 className="text-lg font-semibold text-green-700 mb-3">
          Categories
        </h3>

        <ul className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="bg-green-200 hover:bg-green-300 transition p-3 rounded-xl text-center font-medium text-green-900 shadow-sm"
            >
              {cat.name}
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default HomePage
