import React from 'react'
import chicken from '../assets/images/chicken-7.jpg'

function About() {
  return (
    <div>
      <section className="about_section layout_padding">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-5 offset-md-1">
        <div className="detail-box pr-md-2">
          <div className="heading_container">
            <h2 className="">About Us</h2>
          </div>
          <p className="detail_p_mt">
            At Nasradamuff Farm and Agro-Allied Ventures, we specialize in livestock farming,
             inventory management, and providing farmers with the resources they need to succeed. With decades of experience in the agro-industry,
             we ensure that our clients get the best livestock, feed, and farming support.
          </p>
          <a href="about.html" className="">
            Read More
          </a>
        </div>
      </div>
      <div className="col-md-6 px-0">
        <div className="img-box ">
          <img src={chicken} className="box_img" alt="about img" />
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default About
