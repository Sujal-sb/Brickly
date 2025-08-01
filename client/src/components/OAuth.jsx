import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async()=>{
    try{
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const result = await signInWithPopup(auth,provider);
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/auth/google`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: result.user.displayName,email: result.user.email,photo: result.user.photoURL}),
        });
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
    }
    catch(error){
        console.log("sign in failed",error);
    }
  };
  return (
    <button
  onClick={handleGoogleClick}
  type="button"
  className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-300"
>
  <FcGoogle size={24} />
  Continue with Google
</button>
  )
}
