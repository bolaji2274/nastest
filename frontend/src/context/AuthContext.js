// import React, { Children } from 'react'
import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
const swal = require('sweetalert2')

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem('authTokens') 
            ? JSON.parse(localStorage.getItem('authTokens')) 
            : null;
    });

    const [user, setUser] = useState(() => {
        return localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null;
    });

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});  // Store form errors as an object

    const navigate = useNavigate(); // useNavigate returns the navigate function

    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json(); // Extract JSON data from response
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                setErrors({});  // Clear previous errors
                navigate("/");
            } else if (response.status === 400) {
                // Handle form field errors for login (e.g. invalid credentials)
                setErrors(data); // Make sure backend returns field errors
            } else {
                swal.fire({
                    title: "Login failed!",
                    text: "Something went wrong.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            swal.fire({
                title: "Login failed!",
                text: "An error occurred.",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
        // const response = await fetch("http://127.0.0.1:8000/api/token/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        // });

        // const data = await response.json();
        // if (response.status === 200) {
        //     setAuthTokens(data);
        //     setUser(jwtDecode(data.access));
        //     localStorage.setItem('authTokens', JSON.stringify(data));
        //     setErrors({});  // Clear previous errors
        //     navigate("/dashboard"); // Correct usage of navigate
        //     swal.fire({
        //         title: "Login Successful",
        //         icon: "success",
        //         toast: true,
        //         timer: 6000,
        //         position: 'top-right',
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })
        // } else if (response.status === 400) {
        //     // Handle form field errors for login
        //     setErrors(data);
        //     swal.fire({
        //         title: "username or password does not exit",
        //         icon: "error",
        //         toast: true,
        //         timer: 6000,
        //         position: 'top-right',
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })
        // }
        
        // else {
        //     swal.fire({
        //         title: "username or password does not exit",
        //         icon: "error",
        //         toast: true,
        //         timer: 6000,
        //         position: 'top-right',
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })
        // }
    };
    // Register function with detailed error handling
    const registerUser = async (email, username, password, password2) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    password2,
                }),
            });

            const data = await response.json(); // Extract JSON data from response
            if (response.status === 201) {
                setErrors({});  // Clear any previous errors
                navigate("/login");
                swal.fire({
                    title: "Registration Successful, Login Now",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else if (response.status === 400) {
                // Capture Django-like form field errors
                setErrors(data); // This `data` should be the error dictionary from Django
            } else {
                swal.fire({
                    title: "Registration failed!",
                    text: "Something went wrong.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            swal.fire({
                title: "Registration failed!",
                text: "An error occurred.",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
        // const response = await fetch("http://127.0.0.1:8000/api/register/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email,
        //         username,
        //         password,
        //         password2,
        //     }),
        // });

        // if (response.status === 201) {
        //     setErrors({});  // Clear any previous errors
        //     navigate("/login"); // Correct usage of navigate
        //     swal.fire({
        //         title: "Registration Successful, Login Now",
        //         icon: "success",
        //         toast: true,
        //         timer: 6000,
        //         position: 'top-right',
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })  
        // } else if (response.status === 400) {
        //     // Capture Django-like form field errors
        //     setErrors(data);
        //     swal.fire({
        //         title: "password does not match",
        //         icon: "success",
        //         toast: true,
        //         timer: 6000,
        //         position: 'top-right',
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })
        // }   
        // else {
        //     swal.fire({
        //         title: "password does not match",
        //         icon: "success",
        //         toast: true,
        //         timer: 6000,
        //         position: 'top-right',
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })
        // }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate("/login"); // Correct usage of navigate
        swal.fire({
                title: "You have been log out",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
    };
    const clearErrors = () => {
        setErrors({});  // Function to clear errors
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        errors,  // Expose form field errors
        clearErrors,  // Expose clearErrors function to reset the error state
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};



// export const AuthProvider = ({ children }) => {
//     const [authTokens, setAuthTokens] = useState(()=> {
//         localStorage.getItem('authTokens')
//             ? JSON.parse(localStorage.getItem('authTokens'))
//             : null
//     })

//     const [user, setUser] = useState(() => {
//         localStorage.getItem('authTokens')
//             ? jwtDecode(localStorage.getItem('authTokens'))
//             : null
//     })



//     const [loading, setLoading] = useState(true)

//     const history = useNavigate()

//     const loginUser = async (email, password) => {
//         const response = await fetch("http://127.0.0.1:8000/api/token/", {
//             method: "POST",
//             headers: {
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({
//                 email, password
//             })
//         })

//         const data = await response.json()
//         document.write(data);
//         console.log(data);

//         if(response.status === 200){
//             document.write("Login In");
//             console.log("Login In");
//             setAuthTokens(data)
//             setUser(jwtDecode(data.access))
//             localStorage.setItem("authTokens", JSON.stringify(data))
//             history("/")
//         } else {
//             document.write(response.status);
//             document.write("There was an issue")
//             console.log(response.status);
//             console.log("There was an issue");
//             alert("something went wrong " + response.status)
//         }
//     }


//     const registerUser = async (email, username, password, password2) => {
//         const response = await fetch("http://localhost:8000/api/register/", {
//             method: "POST",
//             headers: {
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({
//                 email, username, password, password2
//             })
//         })
//         if(response.status === 201){
//             history("/login")
//         } else {
//             document.write(response.status);
//             document.write("There was an issue")
//             console.log(response.status);
//             console.log("There was an issue");
//             alert("something went wrong " + response.status)
//         }
//     }

//     const logoutUser = () => {
//         setAuthTokens(null)
//         setUser(null)
//         localStorage.removeItem("authTokens")
//         history.push("/login")
//     }

//     const contextData = {
//         user,
//         setUser,
//         authTokens,
//         setAuthTokens,
//         registerUser,
//         loginUser,
//         logoutUser
//     }

//     useEffect(() => {
//         if (authTokens){
//             setUser(jwtDecode(authTokens.access))
//         }
//         setLoading(false)
//     }, [authTokens, loading])

//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? null : children}
//         </AuthContext.Provider>
//     )
// }

export default AuthContext



// function AuthContext() {
//   return (
//     <div>
      //     const [user, setUser] = useState(() => {
//     const token = localStorage.getItem('authTokens');
//     // Check if token exists before decoding
//     return token ? jwtDecode(token) : null;
// });
//  const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('authTokens');
//         if (token) {
//             try {
//                 const decodedUser = jwtDecode(token);
//                 setUser(decodedUser);  // Successfully set user after decoding
//             } catch (error) {
//                 console.error('Invalid token', error);
//                 setUser(null);  // Reset user if decoding fails
//             }
//         }
//     }, []);  // Empty dependency array to run only on component mount

//     // Fallback if user is not initialized yet
//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     // Once the user is available, render the component
//     return (
//         <div>
//             <h1>Welcome, {user.name}</h1>
//         </div>
//     );
//     </div>
//   )
// }

// export default AuthContext
