import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
}

function AddExpense() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const result = await API.get('/categories');
      setCategories(result.data.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const handleAddExpense = async () => {
    try {
      await API.post('/addexpense', {
        description,
        amount,
        category,
      });

      navigate('/expenses');
    } catch (error) {
      console.log('Add expense error:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
          Add Expense
        </h1>

        <input
          type="text"
          placeholder="Expense Name"
          className="w-full mb-4 p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full mb-4 p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select
          className="w-full mb-6 p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddExpense}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpense;