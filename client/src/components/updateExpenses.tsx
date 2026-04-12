import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

interface Expense {
  id: number;
  amount: number;
  description: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

function UpdateExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ONLY USE GET ALL + FILTER (NO BACKEND CHANGE)
  const fetchExpense = async () => {
    try {
      const res = await API.get('/expenses');

      const exp = res.data.data.find(
        (e: Expense) => e.id === Number(id)
      );

      if (!exp) {
        console.log("Expense not found");
        return;
      }

      setDescription(exp.description);
      setAmount(exp.amount);
      setCategory(exp.category_id.toString());

    } catch (err) {
      console.log('fetch error', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (id) fetchExpense();
  }, [id]);

  const handleUpdateExpense = async () => {
    try {
      await API.put(`/updateexpense/${id}`, {
        description,
        amount,
        category: Number(category),
      });

      navigate('/expenses');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-green-700 text-center mb-6">
          Update Expense
        </h1>

        <input
          className="w-full mb-4 p-3 rounded-xl border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense Name"
        />

        <input
          type="number"
          className="w-full mb-4 p-3 rounded-xl border"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />

        <select
          className="w-full mb-6 p-3 rounded-xl border"
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
          onClick={handleUpdateExpense}
          className="w-full bg-green-600 text-white p-3 rounded-xl"
        >
          Update Expense
        </button>

      </div>
    </div>
  );
}

export default UpdateExpense;