import React from 'react';
import './footer.css';

const Footer = () => {
  return (
<section id="footer">
    <div class="container">
      <div class="row text-center text-xs-center text-sm-left text-md-left">
        <div class="col-xs-12 col-sm-3 ">
          <ul class="list-unstyled quick-links">
            <li><a href="/"><i class="fa fa-angle-double-right"></i>Home</a></li>
          </ul>
        </div>
        <div class="col-xs-12 col-sm-3 ">
          <ul class="list-unstyled quick-links">
            <li><a href="/about"><i class="fa fa-angle-double-right"></i>About</a></li>
          </ul>
        </div>
        <div class="col-xs-12 col-sm-3 ">
          <ul class="list-unstyled quick-links">
            <li><a href="/about"><i class="fa fa-angle-double-right"></i>Điều khoản sử dụng</a></li>
          </ul>
        </div>
        <div class="col-xs-12 col-sm-3 ">
          <ul class="list-unstyled quick-links">
            <li><a href="/about"><i class="fa fa-angle-double-right"></i>Liên hệ</a></li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text-center" style={{color: 'white'}}>Contacts Us</h3>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
          <ul class="list-unstyled list-inline social text-center">
            <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-facebook"></i></a></li>
            <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-google-plus"></i></a></li>
            <li class="list-inline-item"><a href="javascript:void();" target="_blank"><i class="fa fa-envelope"></i></a></li>
          </ul>
        </div>
        <hr></hr>
      </div>  
    </div>
  </section>
  )
}

export default Footer;