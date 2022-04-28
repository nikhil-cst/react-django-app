import './App.css';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Notes } from './components/Notes';
import { Login } from './components/Login';
import { Route, Routes } from 'react-router-dom';
import { Updatenote } from './components/Updatenote';
import { Page404 } from './components/Page404';
import { Signup } from './components/Signup';

function App() {
  return (
    <>
    <Navbar />
    <Routes >
      <Route path="*" element={<Page404 />} />
      <Route exact path='/' element={<Home/>} />
      <Route exact path="/add-note" element={<Notes />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/sign-up" element={<Signup />} />
      <Route exact path="/update-note/:id" element={<Updatenote/>} />
    </Routes >
    </>
  );
}

export default App;
