import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';  
import AddExpense from '../components/AddExpense';
import GetExpenses from '../components/getExpenses';
import Auth from '../components/Auth';
import UpdateExpenses from '../components/updateExpenses';
import HomePage from '../components/HomePage';

function MainRoute() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path='/expenses' element={<GetExpenses/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/updateexpense/:id' element={<UpdateExpenses/>}/>
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>  
    </div>
  )
}

export default MainRoute
