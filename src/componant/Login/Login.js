import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';

const auth = getAuth(app)
const Login = () => {


    // password validation state
    const [passStrong, setPassStrong] = useState('')

    // register success message
    const [regSuccess, setRegSuccess] = useState(false)


    // send email and reset password state
    const [resetPass, setResetPass] = useState('')

    console.log(resetPass);
    // password authentication
    const submitForm = (event) => {
        event.preventDefault()
        setRegSuccess(false);
        const form = event.target;
        // console.log(event.target.email.value);
        const email = form.email.value;
        const password = form.password.value
        setResetPass(email)
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {

                const user = result.user;
                console.log(user);
                setRegSuccess(true)
                emialVerification()
                form.reset();
            })
            .catch(error => {
                console.error('this is error', error)
                setPassStrong('password is not valid')
            })

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

    const getEmail = (event) => {
        const getEmail = event.target.value;
        console.log(getEmail);
        setResetPass(getEmail)
    }

    // send email and reset password
    const forgot = () => {
        if (!resetPass) {
            alert('type your email')
            return
        }
        sendPasswordResetEmail(auth, resetPass )
            .then(() => {
                alert('chek email and reset')
            })
            .catch(error => {

            })
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Nayeem.Dev
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login your account
                            </h1>
                            <form onSubmit={submitForm} className="space-y-4 md:space-y-6" action="#">

                                {/* Email section  */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onBlur={getEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                {/* password section  */}
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <p className=' text-rose-600'>{passStrong}</p>
                                    {regSuccess && <p className=' text-green-500'>Login Successful</p>}
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
                                <button type="submit" className="w-full bg-orange-600 text-white  focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange--600 dark:hover:bg-orange--700 dark:focus:ring-orange--800">Login account</button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account? <Link to={'/register'}>Register</Link>
                                </p>

                            </form>
                            <button onClick={forgot} className=' mt-1'> <small className='mt-0'> forget your password</small>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;