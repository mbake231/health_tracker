// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';
import SideMenu from './SideMenu.jsx'
import * as React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import Nav from 'react-bootstrap/Nav'


function NavBar() {
  return (
    <Nav
  activeKey="/home"
  style={{backgroundColor:'#8C1C13', display:'block', flexWrap:'nowrap', height:'50px', zIndex:'999'
}}

>
    <SideMenu></SideMenu>
    <Nav.Item>
    <Nav.Link style={{ position:'fixed',color:'white',left:'45px', top:'-6px',fontWeight:'bold', fontSize:'30px', fontFamily:'Roboto, sans-serif'}}> Health Tracker</Nav.Link>
  </Nav.Item>


</Nav>
  );
}

export default NavBar;
