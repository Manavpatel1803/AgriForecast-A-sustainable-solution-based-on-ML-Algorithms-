import React, {useState} from 'react';
import styles from './Signup.module.css';
import InputControl from '../InputControl/InputControl';    
import {Link, useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import video  from '../../images/video.mp4'

function Signup() {
  const navigate=useNavigate();
  const [values,setValues] =useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmission=() =>
  {
    if (!values.name || !values.email || !values.password || !values.mobile) {
        setErrorMsg("Fill all fields");
        return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth,values.email,values.password)
    .then(async(res)=>{
        setSubmitButtonDisabled(false);
        const user=res.user;
        await updateProfile(user,
            {displayName:values.name});
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
            <h1 className={styles.heading}>Sign Up</h1>

            <InputControl label="Name" placeholder="Enter your Full  Name" 
            onChange = {
                (event) =>setValues((prev)=>({...prev,name:event.target.value}))
            }
            />
            <InputControl label="Email" placeholder="Enter email address" 
            onChange ={
                (event) =>setValues((prev)=>({...prev,email:event.target.value}))
            }
            />
            <InputControl label="Password" placeholder="Enter your password" 
            onChange=
            {
                (event) =>setValues((prev)=>({...prev,password:event.target.value}))
            }
            />
            <InputControl label="Mobile Number " placeholder="Enter your phone number" 
            onChange=
            {
                (event) =>setValues((prev)=>({...prev,mobile:event.target.value}))
            }
            
            />
        
        
          <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}>Sign UP</button>
            <p>Already have account? <span>
                <Link to ='/Login'>Login here </Link></span></p>
          </div>



        </div>



      
    </div>
  );
}

export default Signup;
