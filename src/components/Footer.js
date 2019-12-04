import React from 'react'
import {Image} from 'react-bootstrap';

export default function Footer() {
    return (

        <footer className="page-footer font-small unique-color-dark">
        
          <div style={{backgroundColor: '#333333'}}>
            <div className="container">
        

              <div className="row py-4 d-flex align-items-center">

                <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                  <h6 style={{color: 'white'}} className="mb-0">Get connected with us on social networks!</h6>
                </div>

                <div style={{color: 'white'}} className="col-md-6 col-lg-7 text-center text-md-right">
        

                  <a className="fb-ic">
                    <i className="fab fa-facebook-f white-text mr-4"> </i>
                  </a>

                  <a className="tw-ic">
                    <i className="fab fa-twitter white-text mr-4"> </i>
                  </a>

                  <a className="gplus-ic">
                    <i className="fab fa-google-plus-g white-text mr-4"> </i>
                  </a>

                  <a className="li-ic">
                    <i className="fab fa-linkedin-in white-text mr-4"> </i>
                  </a>

                  <a className="ins-ic">
                    <i className="fab fa-instagram white-text"> </i>
                  </a>
        
                </div>

        
              </div>

        
            </div>
          </div>
        

          <div className="container text-center text-md-left mt-5">

            <div className="row mt-3">
        

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        

                <Image style={{marginBottom: '8px', marginTop: '-6px'}}className="logo" src="https://s1.upanh.pro/2019/12/02/Panoko_logo_png.png" /><br></br>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}></hr>
                <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                  consectetur
                  adipisicing elit.</p>
        
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        

                <h6 className="text-uppercase font-weight-bold">Products</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}></hr>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>MDBootstrap</a>
                </p>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>MDWordPress</a>
                </p>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>BrandFlow</a>
                </p>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>Bootstrap Angular</a>
                </p>
        
              </div>

        

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        

                <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}></hr>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>Your Account</a>
                </p>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>Become an Affiliate</a>
                </p>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>Shipping Rates</a>
                </p>
                <p>
                  <a href="#!" style={{color: '#EA4C89'}}>Help</a>
                </p>
        
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                <h6 className="text-uppercase font-weight-bold">Contact</h6>
                <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px'}}></hr>
                <p>
                  <i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@example.com</p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
        
              </div>

        
            </div>

        
          </div>


          <div className="footer-copyright text-center py-3">© 2019 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/" style={{color: '#EA4C89'}}> https://hang-yoko-tran.github.io/portfolio-coderschool/.com</a>
          </div>

        
        </footer>


    )
}