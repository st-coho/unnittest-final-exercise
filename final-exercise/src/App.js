import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';
import { ToastContainer } from 'react-toastify';
import { Provider} from "react-redux"
import Store from './Redux/Store';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
          <div className='header'>
            <Link to={'/'}>Home</Link>
            <Link to={'/user'}>Users</Link>
          </div>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/user' element={<UserList></UserList>}></Route>
            <Route path='/edit/:id' element={<UpdateUser></UpdateUser>}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer></ToastContainer>
      </div>
    </Provider>
  );
}

export default App;
