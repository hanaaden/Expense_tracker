import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';  
import AddExpense from '../components/AddExpense';
import GetExpenses from '../components/getExpenses';
import Auth from '../components/Auth';
import UpdateExpenses from '../components/updateExpenses';
import HomePage from '../components/HomePage';
import Profile from '../components/getProfile';

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
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>  
    </div>
  )
}

export default MainRoute
