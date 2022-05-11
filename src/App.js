import React, { useState } from 'react';

import Login from './component/Login/Login'
import Home from './component/Home/Home';
import MainHeader from './component/MainHeader/MainHeader';
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);//useEffect теги запростун кайра кайталануусуна тассирин тийгизген параметр
//анткени биз форманы толтурганда true болуп loginHandler функциясы иштейт дагы запрос кайра иштейт
  
useEffect(() => {
  const stotredUserLoggedInfo = localStorage.getItem('isLoggedIn') // ключ аркылуу item алсак болот

  if(stotredUserLoggedInfo === '1'){ //бул жерде логика жазылып жатат эгер stotredUserLoggedInfo 1 ге барабар болсо setIsLoggedIn true болот
  setIsLoggedIn(true)
}
}, [])

const loginHandler = async (email, password) => {
    localStorage.setItem('isLoggedIn' , '1') //item бул жерде 1 себеби ал true болгону учун бир нерсе келгенде иштейт
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn') //бул жерде болсо localStorage ти тазалап турат 
    setIsLoggedIn(false);
  };//регистрация туура аткарылгандан кийин logout кнопкасын бассак кайра башынан формага кайтабыз
  //

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      {/* MainHeader де isLoggedIn берилет ал Navigation га пропс берилет жана onLagout да иштейт */}
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
            {/* Эгер регистрация болгон эмес болсо анда Login page иштейтформа ачылат */}
        {isLoggedIn && <Home onLogout={logoutHandler} />} 
            {/* регистирация кылсак Home page иштейт */}

      
      </main>
    </React.Fragment>
  );
}

export default App;
