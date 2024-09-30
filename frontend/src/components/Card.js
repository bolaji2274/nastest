import React from 'react'
import chicken from '../assests/images/chickens.jpg'
import fish from '../assests/images/fish.jpg'
import turkey from '../assests/images/turkey.jpg'
function Card() {
  return (
    <div class="container mt-4">
      <div class="row mt-5">
    <div class="col-md-4">
        <div class="card">
            <img src={chicken} class="card-img-top" alt="Livestock"/>
            <div class="card-body">
                <h5 class="card-title">Livestock Management</h5>
                <p class="card-text">Apply for livestock, monitor progress, and participate in the management process.</p>
                <a href="" class="btn btn-outline-primary">Learn More</a>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <img src={fish} class="card-img-top" alt="Profit Sharing"/>
            <div class="card-body">
                <h5 class="card-title">Profit Sharing</h5>
                <p class="card-text">Contribute to farm growth and receive your share of the profits through our profit-sharing program.</p>
                <a href="" class="btn btn-outline-primary">Discover More</a>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <img src={turkey} class="card-img-top" alt="Customer Services"/>
            <div class="card-body">
                <h5 class="card-title">Customer Services</h5>
                <p class="card-text">We are committed to delivering excellent services to our customers. Manage your account and get support.</p>
                <a href="" class="btn btn-outline-primary">Get Started</a>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Card
