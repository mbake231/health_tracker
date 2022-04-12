import { slide as Menu } from 'react-burger-menu'
import * as React from 'react';

export default function SideMenu() {


    var styles = {
        bmBurgerButton: {
          position: 'fixed',
          width: '36px',
          height: '30px',
          left: '16px',
          top: '10px'
        },
        bmBurgerBars: {
          background: 'white',
          height:'10%'
        },
        bmBurgerBarsHover: {
          background: '#a90000'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#373a47',
          padding: '2.5em 1.5em 0',
          fontSize: '1.15em'
        },
        bmMorphShape: {
          fill: '#373a47'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
        bmItem: {
          display: 'inline-block'
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)'
        }
      }

      // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
      return (
        <Menu styles={styles} isOpen={false}>
            
          
        <a id="home" className="menu-item" href="/">My trackers</a><br></br>
        <a id="about" className="menu-item" href="/about">Content</a>
    
      </Menu>
     
      );
    
  }

