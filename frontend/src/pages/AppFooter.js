import React from 'react'

function AppFooter() {
  return (
    <div>
      <>
  {/* info section */}
  <section className="info_section ">
    <div className="container">
      <div className="info_top">
        <div className="row">
          <div className="col-md-3 ">
            <a className="navbar-brand" href="index.html">
              Nasradamuff
            </a>
          </div>
          <div className="col-md-5 ">
            <div className="info_contact">
              <a href="">
                <i className="fa fa-map-marker" aria-hidden="true" />
                <span>Location</span>
              </a>
              <a href="">
                <i className="fa fa-phone" aria-hidden="true" />
                <span>+234 91 55 11 37 97</span>
              </a>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="social_box">
              <a href="">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
              <a href="">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="info_bottom">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="info_detail">
              <h5>Company</h5>
              <p>
                Randomised words which don't look even slightly believable. If
                you are going to use a passage of Lorem Ipsum, you need to be
                sure
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="info_form">
              <h5>NEWSLETTER</h5>
              <form action="">
                <input type="text" placeholder="Enter Your Email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="info_detail">
              <h5>Services</h5>
              <p>
                Randomised words which don't look even slightly believable. If
                you are going to use a passage of Lorem Ipsum, you need to be
                sure
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <div className="">
              <h5>Useful links</h5>
              <ul className="info_menu">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="service.html">Services</a>
                </li>
                <li>
                  <a href="team.html">Team</a>
                </li>
                <li className="mb-0">
                  <a href="contact.html">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* end info_section */}
  {/* footer section */}
  <footer className="footer_section">
    <div className="container">
      <p>
        © <span id="displayYear" /> All Rights Reserved By
        <a href="https://github.com/bolaji2274/">Bolaji Dev</a>
      </p>
    </div>
  </footer>
  {/* footer section */}
</>

    </div>
  )
}

export default AppFooter
