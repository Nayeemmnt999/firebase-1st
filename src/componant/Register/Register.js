import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import app from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';
import { SingupContext } from '../../App';

const auth = getAuth(app)

const Register = () => {

    // password validation state
    const [passStrong, setPassStrong] = useState('')

    // register success message
    const [regSuccess, setRegSuccess] = useState(false)

    // password authentication
    const submitForm = (event) => {
        event.preventDefault()
        setRegSuccess(false);
        const form = event.target;
        // console.log(event.target.email.value);
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        createUserWithEmailAndPassword(auth, email, password)
            // signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setRegSuccess(true)
                emialVerification()
                updateUserName(name)
                form.reset();
            })
            .catch(error => {
                console.error('this is error', error)
                setPassStrong(error.message)
            })

        // update name
        const updateUserName = (name) => {

            updateProfile(auth.currentUser, {
                displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });

        }

        // email varification
        const emialVerification = () => {
            sendEmailVerification(auth.currentUser);
            alert('verification your email address')
        }



        // Password validation

        if (!/(?=.*[a-z])/.test(password)) {
            setPassStrong(' password must contain one lowercase letter.')
            return
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            setPassStrong(' password must contain one upercase letter.')
            return
        }
        if (!/(?=.*[0-9])/.test(password)) {
            setPassStrong('password must contain a single digit from 1 to 9.')
            return
        }
        if (!/(?=.*\W)/.test(password)) {
            setPassStrong(' password must contain  one special character.')
            return
        }
        if (password.length < 6) {
            setPassStrong('the password must be 8-16 characters long')
            return
        }
        if (password.length > 16) {
            setPassStrong('the password must be under 16 characters long')
            return
        }
    }

    // const onclick = (event) => {
    //     console.log(event.target.value);
    // }
    const { signUpGoogle, signUpGithub } = useContext(SingupContext)
    return (
        <div>

            {/* register for menual  */}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Nayeem.Dev
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form onSubmit={submitForm} className="space-y-4 md:space-y-6" action="#">

                                {/* name section  for create a new account  */}

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full-Name" required />
                                </div>

                                {/* Email section  */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                {/* password section  */}
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <p>{passStrong}</p>
                                    {regSuccess && <p className=' text-green-500'>registration Successful</p>}
                                </div>
                                {/* terms and conditions checkbox section */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                {/* account creat button  */}
                                <button type="submit" className="w-full bg-orange-600 text-white  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange--600 dark:hover:bg-orange--700 dark:focus:ring-orange--800">Create an account</button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to={'/login'}>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>







                {/* register for social  */}


                <div className="relative  me-5 ">
                    <div className="relative container m-auto  text-gray-500 md:px-12 xl:px-40">
                        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                            <div className="rounded-xl  shadow-xl">
                                <div className="">
                                    <div className=" grid space-y-4">
                                        <button onClick={signUpGoogle} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                            <div className="relative flex items-center space-x-4 justify-center">
                                                <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-5" alt="google logo" />
                                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                                            </div>
                                        </button>
                                        <button onClick={signUpGithub} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                            <div className="relative flex items-center space-x-4 justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
                                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                                </svg>
                                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Github</span>
                                            </div>
                                        </button>
                                        <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                            <div className="relative flex items-center space-x-4 justify-center">
                                                <img src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg" className="absolute left-0 w-5" alt="Facebook logo" />
                                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Facebook</span>
                                            </div>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>






            </section>
        </div>
    );
};

export default Register;