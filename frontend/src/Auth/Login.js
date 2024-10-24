import React from 'react'
import { Link } from 'react-router-dom'
import chicken from '../assets/images/chicken-8.jpg'
import bg_img from '../assets/images/turkey-3.jpg'

function Login() {
  return (
    <div>
      <>
  <meta charSet="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
  <title>Login Page</title>
  {/* MDB icon */}
  <link rel="icon" href="img/mdb-favicon.ico" type="image/x-icon" />
  {/* Font Awesome */}
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
  />
  {/* Google Fonts Roboto */}
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
  />
  {/* MDB */}
  <link rel="stylesheet" href="css/bootstrap-login-form.min.css" />
  {/* Start your project here*/}
  <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card shadow-2-strong"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
                <form>
                    
                </form>
              <h3 className="mb-5">Login In</h3>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="typeEmailX-2"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="typeEmailX-2">
                  Email
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="typePasswordX-2"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="typePasswordX-2">
                  Password
                </label>
              </div>
              {/* Checkbox */}
              <div className="form-check d-flex justify-content-start mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="form1Example3"
                />
                <label className="form-check-label" htmlFor="form1Example3">
                  {" "}
                  Remember password{" "}
                </label>
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Login
              </button>
              <hr className="my-4" />
              <button
                className="btn btn-lg btn-block btn-primary"
                style={{ backgroundColor: "#dd4b39" }}
                type="submit"
              >
                <i className="fab fa-google me-2" /> Sign in with google
              </button>
              <button
                className="btn btn-lg btn-block btn-primary mb-2"
                style={{ backgroundColor: "#3b5998" }}
                type="submit"
              >
                 <a className="small text-muted" href="#!">
                      Forgot password?
                    </a>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Don't have an account?{" "}
                      <Link to="/register" href="#!" style={{ color: "#393f81", marginLeft: "10px" }}>
                        Register Now
                      </Link>
                    </p>
                    <a href="#!" className="small text-muted">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                <i className="fab fa-facebook-f me-2" />
                Sign in with facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End your project here*/}
  {/* MDB */}
  {/* Custom scripts */}
</>

    </div>
  )
}

export default Login
