import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useReducer } from 'react';


///*1-вариант*/
// const passReducer = (prevState, action) => {
//   if(action.type === 'USER_INPUT'){
//     return {
//       value: action.passwordValue, 
//       isValid: action.passwordValue.trim().length > 6,
//     }
//   }
//   if(action.type === 'INPUT_BLUR'){
//     return {
//       value: prevState.value,
//       isValid: prevState.value.trim().length > 6,
//     };
//   }
//   return {
//     value: '',
//     isValid: false,
//   };
// };

// const Login = (props) => {

//   const [passwordState, dispatchPass] = useReducer((passReducer), {
//     isValid: '',
//     value: ''
//   })
//    const [enteredEmail, setEnteredEmail] = useState('');
//    const [emailIsValid, setEmailIsValid] = useState();
//   //const [enteredPassword, setEnteredPassword] = useState('');//password жазылат
//   //const [passwordIsValid, setPasswordIsValid] = useState();// password тууралыгын текшерет
//   const [formIsValid, setFormIsValid] = useState(false);
//   useEffect(() =>{
//     const timer = setTimeout(() => {
//       setFormIsValid(enteredEmail.includes('@') && passwordState.value.trim().length > 6)
//       console.log('changed');
//     }, 500); 

//   //   //clean up function
//     return () => {
//       clearTimeout(timer) 
//     }
  
//   }, [enteredEmail, passwordState.value]);

//   const emailChangeHandler = (event) => { 
//    setEnteredEmail(event.target.value); 
//     // dispatchEmail({type: 'USER_INPUT', emailValue: event.target.value})
//   //   // setFormIsValid(
//   //   //   event.target.value.includes('@') && enteredPassword.trim().length > 6 //бул жерде почтада @ болушу керек жана пароль 6 дан жогору болуш керек
//   //   // );
//   };

//   const passwordChangeHandler = (event) => {
//     // setEnteredPassword(event.target.value);
//     dispatchPass({type: 'USER_INPUT', passwordValue: event.target.value})

//     // setFormIsValid(
//     //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
//     // );
//   };

//   const validateEmailHandler = () => {
//     setEmailIsValid(enteredEmail.includes('@'));
//     // dispatchEmail({type: 'INPUT_BLUR' })
//   }; 

//   const validatePasswordHandler = () => {
//     // setPasswordIsValid(enteredPassword.trim().length > 6);
//     dispatchPass({type: "INPUT_BLUR"})
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onLogin( passwordState);
//   };
 

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailIsValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={enteredEmail}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//             passwordState.isValid === false ? classes.invalid : ''
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={passwordState.value}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}> 
//             Login
//           </Button> 
//           {/* Эгерде форма туура толтурулса жарактуу болсо анда кнопканы басууга болот антпесе иштебейт */}
//         </div>
//       </form>
//     </Card>
//   );
// };

/////////////////////////////////////////////////////////////////////////////////



/*2-вариант*/

function formReducer(prevState, action) {

  if (action.type === 'USER_INPUT') {
    return {
      ...prevState,  
      valueEmail: action.emailValue,
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      ...prevState,
      isEmailValid: prevState.valueEmail.includes('@'),
    }
  }

  if (action.type === 'PASSWORD_INPUT') {
    return {
      ...prevState,
      valuePassword: action.passwordValue,
    }
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {
      ...prevState,
      isPasswordValid: prevState.valuePassword.trim().length > 6,
    }
  }

}

const Login = (props) => {

  const [formState, dispatchForm] = useReducer(formReducer, {
    valueEmail: '',
    isEmailValid: '',
    valuePassword: '',
    isPasswordValid: '',
  })

  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(formState.valueEmail.includes('@') && formState.valuePassword.trim().length > 6)
      console.log('changed');
    }, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [formState.valueEmail, formState.valuePassword])


  const emailChangeHandler = (event) => {
    dispatchForm({ type: 'USER_INPUT', emailValue: event.target.value })
  }

  const passwordChangeHandler = (event) => {
    dispatchForm({ type: 'PASSWORD_INPUT', passwordValue: event.target.value })
  }
  
  const validateEmailHandler = () => {
    dispatchForm({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchForm({ type: 'PASSWORD_BLUR' }) 
  }


  const submitHandler = (event) => {
    event.preventDefault() 
    props.onLogin(formState.valueEmail, formState.valuePassword) 
  }
 
    return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              formState.isEmailValid === false ? classes.invalid : '' 
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={formState.valueEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler} 
            />
          </div>
          <div
            className={`${classes.control} ${
              formState.isPasswordValid === false ? classes.invalid : '' 
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formState.valuePassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    )
  }
  
export default Login;

