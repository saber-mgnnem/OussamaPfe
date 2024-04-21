import {useState , useEffect} from "react"
import './registre.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import swal from 'sweetalert';

const Registre = () => {


  const navigate = useNavigate();
  const[fisrtname, setfisrtname] =useState("");
  const[lastname, setlastname] =useState("");
  const[email, setEmail] =useState("");
  const[phone, setPhone] =useState("");
  const[password, setPassword] =useState("");
  const [terms, setTerms] = useState(false);
  const role="Etudiant";
  let errorMessage = ""; // define errorMessage variable here
 
 

  const handleRegister = async (e) =>{
    e.preventDefault();

    // rest of the code
  
    if (!fisrtname || !email || !password || !phone || !lastname ||!terms) {
      errorMessage = "All fields are required"; // update errorMessage value
    }
    if (errorMessage) {
      alert(errorMessage);
    } else {  

    try{
      axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post(`/api/register`, { fisrtname,lastname,email,phone,password,role}).then(res => {
            if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    setfisrtname("");
                    setlastname("");
                    setEmail("");
                    setPhone("");
                    setPassword("");
                    swal("Success",res.data.message,"success");
                    navigate('/login');

                  }
               });  
          
          });

    } catch(e){
                   console.log(e)
                  }

                }


  }
  return (
   <div className="dby">
     <div className=" wrapper">
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
  <input 
    type="text" 
    placeholder="Prénom"
    value={fisrtname}
    onChange={(e)=>setfisrtname(e.target.value)}
    required
  />
  <input 
    type="text" 
    placeholder="Nom"
    value={lastname}
    onChange={(e)=>setlastname(e.target.value)}
    required
  />
           
  <input 
    type="email" 
    placeholder="Email adresse"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    required
  />
        
  <input 
    type="tel" 
    placeholder="Téléphone"
    value={phone}
    onChange={(e)=>setPhone(e.target.value)}
    required
  />
  
  <input 
    type="password" 
    placeholder="Mot de passe"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    required
  />

 




  <div className="terms">
  <input 
  type="checkbox" 
  id="checkbox" 
  checked={terms} 
  onChange={(e) => setTerms(e.target.checked)}
  />
  <label style={{color:'black'}}>Je suis d'accord avec <a href="#">termes & conditions</a></label>
  </div>

  <button type="submit">Sign Up</button>

  {errorMessage && <p>{errorMessage}</p>}
</form>

      <div className="member">
      Déjà membre ? <a href="/connexion">Logni Ici</a>
      </div>

     </div>
     
  </div>
  )
}

export default Registre