import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';
import Styles from './Header.css';

class Header extends Component {

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <div className="HeaderNameClass"> PLATINA UI</div>
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>        
        
        <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        
        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler> */}
      </header>
    );
  }
}

export default Header;
//36: http://localhost:8082/#/dashboard