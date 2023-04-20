import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './componant/Main/Main';
import Home from './componant/Home/Home';
import Signup from './componant/SignUp/Signup';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from './Firebase/Firebase';
import { createContext, useState } from 'react';


export const SingupContext = createContext()
function App() {
  // sign up setup
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  const [signIn, setSignIn] = useState({})
console.log(signIn);
  // google authintication
  const signUpGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setSignIn(user)
      })
      .catch(error => {
        setSignIn({})
      })
  }

  // github authintication
  const signUpGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        setSignIn(user)
      })
      .catch(error => {
        setSignIn({})
      })
  }
  const signOutProfile = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setSignIn({})

    }).catch((error) => {
      // An error happened.
      setSignIn({})
    });
}
  // router setup
const router = createBrowserRouter([

  {
    path: '/',
    element: <Main></Main>,
    children: [

      {
        path: '/', element: <Home></Home>
      },
      {
        path: 'home', element: <Home></Home>
      },
      {
        path: 'signup', element: <Signup></Signup>
      }

    ]
  }
])


return (
  <div className="App">
    <SingupContext.Provider value={{ signUpGoogle, signUpGithub, signOutProfile,  signIn }}>
      <RouterProvider router={router}></RouterProvider>
    </SingupContext.Provider>

  </div>
);
}

export default App;
