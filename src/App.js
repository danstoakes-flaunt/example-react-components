import logo from './logo.svg';
import './App.css';

import InputText from "./components/input-text";

function App() {
  return (
    <div>
      <InputText name="password" type="text" placeholder="Password" minLength = { 5 } maxLength={ 20 } />
      <InputText id="password_1" name="password" type="password" placeholder="Password" minLength = { 5 } maxLength={ 20 } hasInteger hasPunctuation />
      <InputText name="password" type="password" placeholder="Password" minLength = { 5 } maxLength={ 20 } hasInteger hasPunctuation match="password_1" />
    </div>
  );
}

export default App;
