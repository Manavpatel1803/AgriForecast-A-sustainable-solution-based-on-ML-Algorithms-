import {React,useState} from 'react';
import styles from './Login.module.css';
import InputControl from '../InputControl/InputControl';    
import {Link, useNavigate} from 'react-router-dom';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import video  from '../../images/video.mp4'

function Login() {
    const navigate=useNavigate();
  const [values,setValues] =useState({
    email: "",
    password: "",
  });

  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmission=() =>
  {
    if (!values.email || !values.password ) {
        setErrorMsg("Fill all fields");
        return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    signInWithEmailAndPassword(auth,values.email,values.password)
    .then(async(res)=>{
        setSubmitButtonDisabled(false);
           navigate('/');   

        
    })
    .catch((err)=>{
        console.log("Error -",err.message);

  }
    );
    }
  return (
    <div className={styles.container}>

      <video className={styles.video} autoPlay loop muted>
      <source src={video} type="video/mp4"/>
      </video>
  
        <div className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>

            <InputControl label="Email" placeholder="Enter email address"
            onChange ={
                (event) =>setValues((prev)=>({...prev,email:event.target.value}))
            }
            />
            <InputControl label="Password" placeholder="Enter your password" 
            onChange ={
                (event) =>setValues((prev)=>({...prev,password:event.target.value}))
            }
            />
        
          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}>Login</button>
            <p>First time user ? <span>
                <Link to ='/signup'>Sign Up Now</Link></span></p>
          </div>



        </div>



      
    </div>
  );
}

export default Login;
