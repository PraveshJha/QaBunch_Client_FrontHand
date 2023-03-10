import Avatar from 'components/Avatar';
import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';
import bn from '../../../src/utils/bemnames';

const bem = bn.create('header');



class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar size={50}
                className="can-click"
              />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
