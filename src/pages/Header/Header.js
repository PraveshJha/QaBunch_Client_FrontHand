import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Modal, ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Row,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import {
  Input
} from 'reactstrap';
import { Config, Users } from '../../QAautoMATER/Config'
import Avatar from '../../uiLayout/Avatar'
import userImage from '../../image/profiletemplate.jpg'
import { UserCard } from '../../uiLayout/components/card';
import NotificationSystem from 'react-notification-system';
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../pages/LoaderMessage';
import restAPI from '../../QAautoMATER/funcLib/restAPI';
import GetData from '../../QAautoMATER/funcLib/getData';
import helpFile from '../../help/Help.pdf'
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { UserProfile } from '../Web/WebPageTableHeader';
import HeaderGetter from './HeaderGetter';
import DataGetter from '../DataGetter';
const bem = bn.create('header');

class Header extends React.Component {
  notificationSystem = React.createRef();
  state = {
    //****** Page Loader ***********************************************************
    isPageLoading: false,
    projects: Config.Project,
    isOpenUserCardPopover: false,
    changePasswordScreen: false,
    isErrorOnCurrentPassword: false,
    currentPassword: '',
    isErrorOnNewPassword: false,
    isErrorOnConfirmPassword: false,
    newPassword: '',
    confirmPassword: '',
    selectedProject: Config.SelectedProject,
    editProfileScreen: false,
    isErrorOnFirstName: false,
    isErrorOnLastName: false,
    userFirstName: Users.firstName,
    userLastName: Users.lastName,
    newUserProfile: false,
    userProfileData:[],
    selectedRowFromUserProfileTable:-1,

  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  toggleChangePasswordScreen = async () => {
    this.setState({ changePasswordScreen: false });
  }

  toggleEditProfileScreen = async () => {
    this.setState({ editProfileScreen: false });
  }

  signOut = async (event) => {
    Users.isUserAuthenticated = false;
    await localStorage.removeItem('Token');
    Users.isUserAuthenticated = false;
    await window.location.reload();
    try {
      var backendApi = Config.backendAPI;
      var backendServiceLocation = await Config.backendServiceAt;
      if (backendServiceLocation === 'remote') {
        backendApi = Config.remoteBackendAPI;
      }
      var dataforSend = {};
      dataforSend['userEmail'] = await Users.userEmail;
      dataforSend['projectName'] = await  localStorage.getItem('UserSelectedAccount');
      var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
      await restAPI.post(backendApi + 'uidebug/debuggerwindow/quit', await headers, await dataforSend);
      await localStorage.removeItem('UserSelectedAccount');
    }
    catch (error) {
    }

  };

  changePassword = async (event) => {
    this.setState({ changePasswordScreen: true })
  };

  openHelpFile = async (event) => {
    await window.open(await helpFile, "_blank");
  };

  addCurrentPassword = async (event) => {
    this.setState({ isErrorOnCurrentPassword: false })
    var dataChoice = await event.target.value;
    if (this.state.currentPassword !== await dataChoice) {
      this.setState({ currentPassword: dataChoice });
    }
  };

  addnewPassword = async (event) => {
    this.setState({ isErrorOnNewPassword: false })
    var dataChoice = await event.target.value;
    if (this.state.newPassword !== await dataChoice) {
      this.setState({ newPassword: dataChoice });
    }
  };

  addConfirmPasword = async (event) => {
    this.setState({ isErrorOnConfirmPassword: false })
    var dataChoice = await event.target.value;
    if (this.state.confirmPassword !== await dataChoice) {
      this.setState({ confirmPassword: dataChoice });
    }
  };

  updatePassword = async (event) => {
    var currentPassword = this.state.currentPassword;
    var newPassword = this.state.newPassword;
    var confirmPassword = this.state.confirmPassword;
    var errorMessage = '';
    if (currentPassword.toString().trim() === '') {
      errorMessage = 'Current Password can not be blank.'
      this.setState({ isErrorOnCurrentPassword: true });
    }
    if (newPassword.toString().trim() === '') {
      errorMessage = errorMessage + 'New Password can not be blank.';
      this.setState({ isErrorOnNewPassword: true });
    }
    if (confirmPassword.toString().trim() === '') {
      errorMessage = errorMessage + 'Confirm Password can not be blank.';
      this.setState({ isErrorOnConfirmPassword: true });
    }
    if (errorMessage.trim() !== '') {
      return;
    }
    if (newPassword.includes(' ')) {
      this.setState({ isErrorOnNewPassword: true });
      return await this.getNotification('error', "New Password should not have space");
    }
    if (newPassword.toString().length <= 6) {
      this.setState({ isErrorOnNewPassword: true });
      return await this.getNotification('error', "Minimum length should be 6 for new password");
    }

    if (newPassword.toString() !== confirmPassword.toString()) {
      this.setState({ isErrorOnConfirmPassword: true });
      return await this.getNotification('error', "New and Confirm Password does not match");
    }
    var backendApi = Config.backendAPI;
    var backendServiceLocation = await Config.backendServiceAt;
    if (backendServiceLocation === 'remote') {
      backendApi = Config.remoteBackendAPI;
    }
    this.setState({ isPageLoading: true })
    var isUserAuthenticated = await GetData.isUserAuthenticated();
    if (await !isUserAuthenticated) {
      this.setState({ isPageLoading: false })
      return await this.getNotification('error', Config.ErrorMessage);
    }
    var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
    var serverResponse = await restAPI.post(backendApi + 'users/changepassword', await headers, { userEmail: Users.userEmail, password: currentPassword, newPassword: newPassword });
    var isUserUpdated = await serverResponse['data'];
    this.setState({ isPageLoading: false })
    if (await isUserUpdated['isPasswordChanged']) {
      this.setState({ changePasswordScreen: false });
      Users.isUserAuthenticated = false;
      window.location.reload();
      return await this.getNotification('success', "Password is successfully updated.");
    }
    else {
      Config.ErrorMessage = await isUserUpdated['errorMessage']
      return await this.getNotification('error', Config.ErrorMessage);
    }

  }

  editProfile = async (event) => {
    this.setState({ isErrorOnFirstName: false })
    this.setState({ isErrorOnLastName: false })
    this.setState({ userFirstName: Users.firstName })
    this.setState({ userLastName: Users.lastName })
    this.setState({ editProfileScreen: true })
  };

  addFirstName = async (event) => {
    this.setState({ isErrorOnFirstName: false })
    var dataChoice = await event.target.value;
    if (this.state.userFirstName !== await dataChoice) {
      this.setState({ userFirstName: dataChoice });
      var format = /[^A-Za-z]/ig;
      if (await format.test(await dataChoice)) {
        this.setState({ isErrorOnFirstName: true });
      }
    }
  };

  addLastName = async (event) => {
    this.setState({ isErrorOnLastName: false })
    var dataChoice = await event.target.value;
    if (this.state.userLastName !== await dataChoice) {
      this.setState({ userLastName: dataChoice });
      var format = /[^A-Za-z]/ig;
      if (await format.test(await dataChoice)) {
        this.setState({ isErrorOnLastName: true });
      }

    }

  };

  updateProfile = async (event) => {
    var userFirstName = this.state.userFirstName;
    var userLastName = this.state.userLastName;
    var errorMessage = '';
    if (await userFirstName.toString().trim() === '') {
      errorMessage = 'First name can not be blank.'
      this.setState({ isErrorOnFirstName: true });
    }
    if (await userLastName.toString().trim() === '') {
      errorMessage = errorMessage + 'Last name can not be blank.';
      this.setState({ isErrorOnLastName: true });
    }
    if (errorMessage.trim() !== '') {
      return;
    }
    if (await this.state.isErrorOnFirstName || await this.state.isErrorOnLastName) {
      return;
    }
    var backendApi = Config.backendAPI;
    var backendServiceLocation = await Config.backendServiceAt;
    if (backendServiceLocation === 'remote') {
      backendApi = Config.remoteBackendAPI;
    }
    var testBody = {};
    testBody['firstName'] = await userFirstName.trim();
    testBody['lastName'] = await userLastName.trim();
    this.setState({ isPageLoading: true })
    var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
    var serverResponse = await restAPI.post(backendApi + 'users/updateprofile', await headers, await testBody);
    var isUserUpdated = await serverResponse['data'];
    this.setState({ isPageLoading: false })
    if (await isUserUpdated['isProfileUpdated']) {
      this.setState({ editProfileScreen: false });
      return await this.getNotification('success', "Profile is successfully updated.");
    }
    else {
      Config.ErrorMessage = await isUserUpdated['errorMessage']
      return await this.getNotification('error', Config.ErrorMessage);
    }

  }

  toggleNewProfileScreen = async () => {
    this.setState({ newUserProfile: false });
  }

  openNewProfilePage = async (event) => {
    this.setState({userProfileData:Users.AllUsersData})
    this.setState({ newUserProfile: true })
  };

  selectRadioButtonFromUserProfileTable = async (row, isSelect) => {
    if (await isSelect) {
      this.setState({ selectedRowFromUserProfileTable: await row.id });
    }
  }

  addNewRowInUserTable = async (event) => {
    await event.preventDefault();
    var tableData = this.state.userProfileData;
    var checkData = await HeaderGetter.isNewUserDataValid(await tableData);
    if(!await checkData['isValid'])
    {
      return await this.getNotification('error', await checkData['errorMessage']);
    }
    var lastId = await tableData.length + 1;
    var newRow = { id: lastId, email: '', firstname: '', lastname: '', password: '' }
    this.setState({ userProfileData: [...this.state.userProfileData, newRow] });

  }

  deleteRowFromUserTable = async (event) => {
    await event.preventDefault();
    var allDataFromTable = this.state.userProfileData;
    var selectedRowId = await Number(await this.state.selectedRowFromUserProfileTable)
    if (await selectedRowId > 0 && await selectedRowId <= allDataFromTable.length) {
      var email = await allDataFromTable[Number(selectedRowId)-1]['email'];
      var useremail = await Users.userEmail;
      if(await email.toString().toLowerCase() === await useremail.toString().toLowerCase())
      {
        return await this.getNotification('error', "You can not delete your own account "+await email);
      }
      var dataAfterDelete = await DataGetter.updateTableAfterDeleteRowId(allDataFromTable, this.state.selectedRowFromUserProfileTable)
      this.setState({ userProfileData: await dataAfterDelete });
      this.setState({ selectedRowFromUserProfileTable: await Number(await selectedRowId) - 1 })
    }
    else {
      return await this.getNotification('error', "No row is selected for delete");
    }

  }

  createNewUserProfile = async (event) => {
    await event.preventDefault();
    var tableData = this.state.userProfileData;
    var checkData = await HeaderGetter.isNewUserDataValid(await tableData);
    if(!await checkData['isValid'])
    {
      return await this.getNotification('error', await checkData['errorMessage']);
    }
    this.setState({ isPageLoading: true })
    var usercreationData = await HeaderGetter.createNewProfileData(await tableData);
    this.setState({ isPageLoading: false })
    if(await usercreationData)
    {
      this.setState({newUserProfile:false})
      await this.getNotification('success', await Config.ErrorMessage);
      await new Promise(wait => setTimeout(wait, 2000));
      await window.location.reload();
    }
    else{
      return await this.getNotification('error', await Config.ErrorMessage);
    }

  }

  //************************* Notification ***************************************************************
  async getNotification(level, message) {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level,
      autoDismiss: 10,
    });
  }

  render() {

    const selectRowFromUserProfileTable = {
      mode: 'radio',
      onSelect: this.selectRadioButtonFromUserProfileTable,
      selected: [this.state.selectedRowFromUserProfileTable]
    };

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        {this.state.isPageLoading && <PageLoader sentences={LoaderMessage} height='120%' color="black" />}
        <NotificationSystem ref={this.notificationSystem} />
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
          <Button outline color='info' size="sm" onClick={this.openHelpFile.bind(this)}>
            <small>Help</small>
          </Button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            {/* <Input type="select" id="projectName">
              <DropDownOptions options={this.state.projects}></DropDownOptions>
            </Input> */}
            <h5>{this.state.selectedProject}</h5>
          </NavItem>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
                size={30}
                src={userImage}
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={`Welcome  ${Users.firstName} ${Users.lastName}`}
                  subtitle={Users.userEmail}
                  text={`License is valid till ${Users.expiresOn}`}
                  className="border-light"
                >
                  <ListGroup flush>
                    {Users.isSuperAdmin && (<ListGroupItem tag="button" onClick={this.openNewProfilePage.bind(this)} action className="border-light">
                      Add User
                    </ListGroupItem>
                    )}
                    <ListGroupItem tag="button" onClick={this.changePassword.bind(this)} action className="border-light">
                      Change password
                    </ListGroupItem>
                    <ListGroupItem tag="button" onClick={this.editProfile.bind(this)} action className="border-light">
                      Edit profile
                    </ListGroupItem>
                    <ListGroupItem onClick={this.signOut.bind(this)} tag="button" action className="border-light">
                      Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
        <Modal isOpen={this.state.changePasswordScreen} className={this.props.className} backdrop="static">
          <ModalHeader toggle={this.toggleChangePasswordScreen.bind(this)}>Change Password</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={5}>
                  Current Password*
                </Label>
                <Col>
                  <Input type="password" name="currentpassword" invalid={this.state.isErrorOnCurrentPassword} value={this.state.currentPassword} onChange={this.addCurrentPassword.bind(this)}>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>
                  New Password*
                </Label>
                <Col>
                  <Input type="password" name="newPassword" invalid={this.state.isErrorOnNewPassword} value={this.state.newPassword} onChange={this.addnewPassword.bind(this)}>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>
                  Confirm Password*
                </Label>
                <Col>
                  <Input type="password" name="confirmPassword" invalid={this.state.isErrorOnConfirmPassword} value={this.state.confirmPassword} onChange={this.addConfirmPasword.bind(this)}>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button color='dark' onClick={this.updatePassword.bind(this)} >Update password</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.editProfileScreen} className={this.props.className} backdrop="static">
          <ModalHeader toggle={this.toggleEditProfileScreen.bind(this)}>Update Profile</ModalHeader>
          <ModalBody>
            <Form>
              {/* <FormGroup row>
                <CardImg
                    className="card-img-center"
                    src=""
                    style={{ width: 'auto', height: 150 }}
                />
                </FormGroup> */}
              <FormGroup row>
                <Label sm={5}>
                  First name*
                </Label>
                <Col>
                  <Input type="input" name="firstname" invalid={this.state.isErrorOnFirstName} value={this.state.userFirstName} onChange={this.addFirstName.bind(this)}>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>
                  Last name*
                </Label>
                <Col>
                  <Input type="input" name="lastname" invalid={this.state.isErrorOnLastName} value={this.state.userLastName} onChange={this.addLastName.bind(this)}>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button color='dark' onClick={this.updateProfile.bind(this)} >Update profile</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <Modal size="xl" isOpen={this.state.newUserProfile} className={this.props.className} backdrop="static">
          <ModalHeader toggle={this.toggleNewProfileScreen.bind(this)}>Add/Edit User Profile</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <Card>
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                      Users
                        <ButtonGroup size="sm" >
                          <Button color='black' onClick={this.addNewRowInUserTable.bind(this)}>
                            <small>Add</small>
                          </Button>
                          <Button color='info' onClick={this.deleteRowFromUserTable.bind(this)}>
                            <small>Delete</small>
                          </Button>
                          <Button color='black' onClick={this.createNewUserProfile.bind(this)}>
                            <small>Save</small>
                          </Button>
                        </ButtonGroup>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Col>
                        <BootstrapTable
                          keyField='id'
                          data={this.state.userProfileData}
                          columns={UserProfile}
                          wrapperClasses="table-responsive"
                          striped
                          hover
                          condensed
                          selectRow={selectRowFromUserProfileTable}
                          cellEdit={cellEditFactory({
                            mode: 'click',
                            blurToSave: true,
                            afterSaveCell: (oldValue, newValue, row, column) => {
                              //this.setState({ dependentCustomFunction: TestScriptData.DependentCustomFunction })
                            }
                          })}
                        />
                      </Col>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </Navbar>
    );
  }
}

export default Header;
