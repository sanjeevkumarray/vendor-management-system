import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../Compoments/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from '../Compoments/Dashboard'
import Home from '../Compoments/Home'
import Employee from '../Compoments/Employee'
import Category from '../Compoments/Category'
import Profile from '../Compoments/Profile'
import AddCategory from '../Compoments/AddCategory'
import AddEmployee from '../Compoments/AddEmployee'
import EditEmployee from '../Compoments/EditEmployee'
import GoogleAuth from '../Compoments/GoogleAuth'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}>
      <Route path='/dashboard/home' element={<Home/>}/>
      <Route path='/dashboard/employee' element={<Employee/>}/>
      <Route path='/dashboard/category' element={<Category/>}/>
      <Route path='/dashboard/profile' element={<Profile/>}/>
      <Route path='/dashboard/add_category' element={<AddCategory/>}/>
      <Route path='/dashboard/add_employee' element={<AddEmployee/>}/>
      <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>} />
      <Route path='/dashboard/' element={<Home/>} />
      </Route>
    </Routes >
    </BrowserRouter>
    </>
  )
}

export default App



