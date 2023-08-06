import Page from '../../Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  ButtonGroup,
  Fade,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { ConfigData } from './ConfigData'
import ConfigGetter from './ConfigGetter'
import { EnvironmentURLTableHeader } from '../WebPageTableHeader'
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DropDownOptions from '../../../uiLayout/components/DropDownOptions'
import NotificationSystem from 'react-notification-system';
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../LoaderMessage';
import { Config, Users } from '../../../QAautoMATER/Config';
import Matcher from '../../../QAautoMATER/funcLib/matcher';
import TreeMenu from 'react-simple-tree-menu';
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import Select from 'react-select';

class ConfigurationPage extends React.Component {
  notificationSystem = React.createRef();
  state = {

    //****** Page Loader ***********************************************************
    isPageLoading: false,

    //****** Test Configuration  ***********************************************************
    listOfTestCycle: ConfigData.ListOfTestCycle,
    currentTestCycle: ConfigData.CurrentTestCycle,
    isErrorOnCurrentTestCycle: ConfigData.IsErrorOnCurrentTestCycle,
    isErrorOnNewTestCycle: ConfigData.IsErrorOnNewTestCycle,
    newTestCycle: ConfigData.NewTestCycle,

    //****** Environment Configuration  ***********************************************************
    envUrlList: ConfigData.EnvUrlList,
    selectedRowFromUrlTable: ConfigData.SelectedRowFromUrlTable,
    isNameValidforUrlTable: ConfigData.IsNameValidforUrlTable,

    //****** Rename Delete Component***************************************************************/
    folderTreeData: ConfigData.FolderTreeData,
    selectedPlaceHolderPath: ConfigData.SelectedPlaceHolderPath,
    selectedPlaceHolderLabel: ConfigData.SelectedPlaceHolderLabel,
    modalForDelete: false,
    newComponentName: ConfigData.NewComponentName,
    isErrorOnNewComponentName: ConfigData.IsErrorOnNewComponentName,
    confirmationModalMessage: '',
    modalActionName: '',

    //*******Move your Test cases *******************************************************/
    selectedSourceComponentToMove: ConfigData.SelectedSourceComponentToMove,
    selectedDestinationComponentToMove: ConfigData.SelectedDestinationComponentToMove,
    listOfAllTestID: ConfigData.ListOfAllTestID,
    listOfTestIdToMove: ConfigData.ListOfTestIdToMove,


  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    await ConfigGetter.manualConfigPageLoad();

    //****** Test Configuration  ***********************************************************
    this.setState({ listOfTestCycle: ConfigData.ListOfTestCycle })
    this.setState({ currentTestCycle: ConfigData.CurrentTestCycle })
    this.setState({ isErrorOnCurrentTestCycle: ConfigData.IsErrorOnCurrentTestCycle })
    this.setState({ isErrorOnNewTestCycle: ConfigData.IsErrorOnNewTestCycle })
    this.setState({ newTestCycle: ConfigData.NewTestCycle })

    //****** Env Configuration  ***********************************************************
    this.setState({ envUrlList: ConfigData.EnvUrlList })
    this.setState({ selectedRowFromUrlTable: ConfigData.SelectedRowFromUrlTable })
    this.setState({ isNameValidforUrlTable: ConfigData.IsNameValidforUrlTable });

    //****** Rename/Delete  ***********************************************************
    this.setState({ folderTreeData: {} }, () => { this.setState({ folderTreeData: ConfigData.FolderTreeData }); });
    this.setState({ selectedPlaceHolderPath: ConfigData.SelectedPlaceHolderPath });
    this.setState({ selectedPlaceHolderLabel: ConfigData.SelectedPlaceHolderLabel });
    this.setState({ newComponentName: ConfigData.NewComponentName });
    this.setState({ isErrorOnNewComponentName: ConfigData.IsErrorOnNewComponentName });

    //*** Move your Test cases**********************************************************/
    this.setState({ selectedSourceComponentToMove: ConfigData.SelectedSourceComponentToMove });
    this.setState({ selectedDestinationComponentToMove: ConfigData.SelectedDestinationComponentToMove });
    this.setState({ listOfAllTestID: ConfigData.ListOfAllTestID });
    this.setState({ listOfTestIdToMove: ConfigData.ListOfTestIdToMove });

  }

  //************************* Notification ***************************************************************
  async getNotification(level, message) {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level
    });
  }

  //****** Test Configuration ***************************************************

  selectTestCycle = async (event) => {
    this.setState({ isErrorOnCurrentTestCycle: false })
    var dataChoice = await event.target.value;
    if (await this.state.currentTestCycle !== await dataChoice) {
      ConfigData.CurrentTestCycle = await dataChoice;
      this.setState({ currentTestCycle: await dataChoice });
    }
  };

  addNewTestCycle = async (event) => {
    this.setState({ isErrorOnNewTestCycle: false })
    var dataChoice = await event.target.value;
    if (await this.state.newTestCycle !== await dataChoice) {
      ConfigData.NewTestCycle = await dataChoice;
      this.setState({ newTestCycle: await dataChoice });
      var format = /[^A-Za-z0-9-. ]/ig;
      if (await format.test(await dataChoice)) {
        ConfigData.IsErrorOnNewTestCycle = true;
        this.setState({ isErrorOnNewTestCycle: true });
      }
    }
  };

  saveNewCycle = async (event) => {

    await event.preventDefault();
    var testCycleName = this.state.newTestCycle;
    if (await testCycleName.toString().trim() === '') {
      this.setState({ isErrorOnNewTestCycle: true });
      return await this.getNotification('error', "New Test Cycle Name can not be blank.");
    }
    if (await this.state.isErrorOnNewTestCycle) {
      this.setState({ isErrorOnNewTestCycle: true });
      return await this.getNotification('error', "Please add the correct test cycle name.");
    }
    if (await Matcher.isValuePresentInArray(await ConfigData.ListOfTestCycle, await testCycleName.toString().trim())) {
      this.setState({ isErrorOnNewTestCycle: true });
      return await this.getNotification('error', "Test Cycle is already exist on server.");
    }
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigGetter.saveNewTestCycle();
    this.setState({ isPageLoading: false });
    if (isSaved) {
      return await this.getNotification('success', 'New Test Cycle is successfully added.');
    }
    else {
      return await this.getNotification('error', 'Unable to save new Test Cycle because of ' + Config.ErrorMessage);
    }

  }

  saveCurrentCycle = async (event) => {

    await event.preventDefault();
    var currentCycleName = this.state.currentTestCycle;
    if (await currentCycleName.toString().trim() === '') {
      this.setState({ isErrorOnNewTestCycle: true });
      return await this.getNotification('error', "Current Test Cycle Name can not be blank.");
    }
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigGetter.saveCurrentTestCycle();
    this.setState({ isPageLoading: false });
    if (isSaved) {
      return await this.getNotification('success', 'Current Test Cycle is successfully added.');
    }
    else {
      return await this.getNotification('error', 'Unable to save Current Test Cycle because of ' + Config.ErrorMessage);
    }

  }

  //****** Env Configuration ***************************************************

  addNewUrlForEnvironment = async (event) => {
    await event.preventDefault();
    var allUrlList = this.state.envUrlList;
    if (allUrlList.length > 0) {
      var prevComponentName = allUrlList[allUrlList.length - 1]['name'];
      var prevComponentUrl = allUrlList[allUrlList.length - 1]['url'];
      if (prevComponentName.toString().trim() === "" || prevComponentUrl.toString().trim() === '') {
        this.setState({ isNameValidforUrlTable: false });
        return await this.getNotification('error', "Please add the correct Env name and Url from 'ADD NEW ENVIRONMENT' section");
      }
    }
    this.setState({ isNameValidforUrlTable: true });
    var lastId = allUrlList.length + 1;
    var newRow = { id: lastId, name: '', url: '' };
    this.setState({ envUrlList: [...this.state.envUrlList, newRow] });
    ConfigData.EnvUrlList.push(newRow);

  }

  deleteUrlFromUrlTable = async (event) => {
    await event.preventDefault();
    var allUrlList = this.state.envUrlList;
    if (allUrlList.length === 0) {
      return await this.getNotification('error', "No Environment is found under 'ADD NEW ENVIRONMENT' section");
    }
    if (Number(this.state.selectedRowFromUrlTable) > 0 && Number(this.state.selectedRowFromUrlTable) <= allUrlList.length) {
      var urlListAfterDelete = await ConfigGetter.updateRowIdAfterDelete(allUrlList, this.state.selectedRowFromUrlTable)
      this.setState({ envUrlList: [] }, () => { this.setState({ envUrlList: urlListAfterDelete }); });
      ConfigData.EnvUrlList = urlListAfterDelete;
    }
    else {
      this.setState({ isNameValidforUrlTable: false });
      return await this.getNotification('error', 'No Environment is selected for delete.');
    }
  }

  saveUrlTableData = async (event) => {
    await event.preventDefault();
    var allUrlList = this.state.envUrlList;
    if (this.state.isNameValidforUrlTable) {
      if (allUrlList.length > 0) {
        var componentName = allUrlList[allUrlList.length - 1]['name'];
        var componentUrl = allUrlList[allUrlList.length - 1]['url'];
        if (componentName.trim() === '' || componentUrl.trim() === '') {
          return await this.getNotification('error', "Please add the correct environment and URL in 'ADD NEW ENVIRONMENTs' table");
        }
      }
      ConfigData.EnvUrlList = allUrlList;
      this.setState({ isPageLoading: true });
      var isSaved = await ConfigGetter.saveURLDetails();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        return await this.getNotification('success', 'Environment and Url information is successfully saved.');
      }
      else {
        return await this.getNotification('error', 'Unable to save Environment and Url information because of ' + Config.ErrorMessage);
      }

    }
    else {
      return await this.getNotification('error', "Please add the correct value in Environment and URL column");
    }
  }

  selectRadioButtonFromURlTable = (row, isSelect) => {
    if (isSelect) {
      ConfigData.SelectedRowFromUrlTable = row.id;
      this.setState({ selectedRowFromUrlTable: row.id });
    }

  }

  // ***** Rename/Delete Configuration********************************
  selectPlaceHolderFromTree = async (item) => {
    var relativePath = await item['key'];
    var folderName = await item['label'];
    ConfigData.SelectedPlaceHolderPath = await relativePath;
    this.setState({ selectedPlaceHolderPath: await relativePath })
    this.setState({ selectedPlaceHolderLabel: await folderName })
  }

  confirmdelete = async (event) => {
    await event.preventDefault();
    var folderToDelete = await ConfigData.SelectedPlaceHolderPath;
    if (await folderToDelete === '') {
      return await this.getNotification('error', 'Please select component which needs to be deleted.');
    }
    if (!await folderToDelete.includes('/')) {
      return await this.getNotification('error', 'Please select component under account which needs to be deleted.');
    }
    this.setState({ modalActionName: 'Delete' });
    this.setState({ confirmationModalMessage: ConfigData.ComponentDeleteMessage });
    this.setState({ modalForDelete: true });
  }

  toggleDeleteModal = async () => {
    this.setState({ modalForDelete: false });
  }

  performModalConfirmationAction = async (event) => {
    await event.preventDefault();
    var actionName = this.state.modalActionName;
    var Message = '';
    switch (await actionName) {
      case "Delete":
        this.setState({ isPageLoading: true });
        var isSaved = await ConfigGetter.deleteManualComponent();
        this.setState({ isPageLoading: false });
        Message = 'Components and all test cases, along with the subcomponents inside them, are successfully deleted.'
        break;
      case "Rename":
        this.setState({ isPageLoading: true });
        var isSaved = await ConfigGetter.renameManualComponent();
        this.setState({ isPageLoading: false });
        Message = 'Test case component are successfully updated.'
        break;
      default:
        return;
    }
    if (await isSaved) {
      this.setState({ modalForDelete: false });
      ConfigData.SelectedPlaceHolderPath = ''
      ConfigData.SelectedPlaceHolderLabel = ''
      this.setState({ selectedPlaceHolderPath: '' })
      this.setState({ selectedPlaceHolderLabel: '' })
      await this.getNotification('success', await Message);
      await new Promise(wait => setTimeout(wait, 2000));
      await window.location.reload();
    }
    else {
      this.setState({ modalForDelete: false });
      return await this.getNotification('error', 'Unable to ' + await actionName + ' component because of ' + Config.ErrorMessage);
    }
  }

  deleteComponent = async (event) => {
    await event.preventDefault();
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigGetter.deleteManualComponent();
    this.setState({ isPageLoading: false });
    if (isSaved) {
      this.setState({ modalForDelete: false });
      ConfigData.SelectedPlaceHolderPath = ''
      ConfigData.SelectedPlaceHolderLabel = ''
      this.setState({ selectedPlaceHolderPath: '' })
      this.setState({ selectedPlaceHolderLabel: '' })
      await this.getNotification('success', 'Components and all test cases, along with the subcomponents inside them, are successfully deleted.');
      await new Promise(wait => setTimeout(wait, 2000));
      await window.location.reload();
    }
    else {
      this.setState({ modalForDelete: false });
      return await this.getNotification('error', 'Unable to delete component because of ' + Config.ErrorMessage);
    }
  }

  addNewComponent = async (event) => {
    this.setState({ isErrorOnNewComponentName: false })
    var dataChoice = await event.target.value;
    if (this.state.newComponentName !== await dataChoice) {
      this.setState({ newComponentName: await dataChoice });
      ConfigData.NewComponentName = await dataChoice;
      if (await dataChoice.trim() === '') {
        this.setState({ isErrorOnNewComponentName: true });
        return;
      }
      var format = /[^A-Za-z -]/ig;
      if (await format.test(await dataChoice)) {
        ConfigData.IsErrorOnNewComponentName = true;
        this.setState({ isErrorOnNewComponentName: true });
      }
    }

  };

  confirmRename = async (event) => {
    await event.preventDefault();
    var folderToRename = await ConfigData.SelectedPlaceHolderPath;
    if (await folderToRename === '') {
      return await this.getNotification('error', 'Please select component which needs to be deleted.');
    }
    if (!await folderToRename.includes('/')) {
      return await this.getNotification('error', 'Please select component under account which needs to be deleted.');
    }
    //Verify Name
    var newName = await this.state.newComponentName;
    if (newName.trim() === '') {
      this.setState({ isErrorOnNewComponentName: true })
      return await this.getNotification('error', 'New component name can not be blank.');
    }
    if (this.state.isErrorOnNewComponentName) {
      this.setState({ isErrorOnNewComponentName: true })
      return await this.getNotification('error', 'Please provide correct Component name , component name can only accept aphabets.');
    }
    folderToRename = folderToRename.split('/')
    const lastIndex = await folderToRename.lastIndexOf('/');
    const parentPath = await folderToRename.slice(0, lastIndex);
    var isPlaceHolderExist = await ConfigGetter.isPlaceHolderAlreadyExist(await parentPath, await newName.trim());
    if (await isPlaceHolderExist) {
      this.setState({ isErrorOnNewComponentName: true });
      return await this.getNotification('error', 'Placeholder ' + ConfigData.SelectedPlaceHolderLabel + ' is already exist.');
    }
    this.setState({ modalActionName: 'Rename' });
    this.setState({ confirmationModalMessage: ConfigData.ComponentRenameMessage });
    this.setState({ modalForDelete: true });
  }

  //************* Move your test scripts Features *****************************************/

  selectSourceComponentFromTree = async (item) => {
    var relativePath = await item['key'];
    if(await relativePath !==this.state.selectedSourceComponentToMove)
    {
      ConfigData.SelectedSourceComponentToMove = await relativePath;
      this.setState({ selectedSourceComponentToMove: await relativePath })
      if(await relativePath !=='' && (await relativePath.includes('/')))
      {
        //** get lis of Test ID */
        this.setState({listOfTestIdToMove:[]})
        this.setState({listOfAllTestID:[]})
        ConfigData.ListOfAllTestID = [];
        ConfigData.ListOfTestIdToMove =[]
        this.setState({isPageLoading:true})
        var output = ConfigGetter.getListOfTestCaseFromComponent(await relativePath);
        this.setState({isPageLoading:false})
        ConfigData.ListOfAllTestID = await output;
        this.setState({listOfAllTestID:await output})
      }
      else{
        this.setState({listOfTestIdToMove:[]})
        this.setState({listOfAllTestID:[]})
        ConfigData.ListOfAllTestID = [];
        ConfigData.ListOfTestIdToMove =[]
      }
    }
  }

  selectTestScriptsToMove = async (event) => {
    this.setState({ listOfTestIdToMove: [] })
    ConfigData.ListOfTestIdToMove = await event;
    this.setState({ listOfTestIdToMove: await event });
  };

  selectDestinationComponentFromTree = async (item) => {
    var relativePath = await item['key'];
    //var folderName = await item['label'];
    ConfigData.SelectedDestinationComponentToMove = await relativePath;
    this.setState({ selectedDestinationComponentToMove: await relativePath })
  }

  moveTestCases = async (event) => {
    await event.preventDefault();
    var sourceComponent = await this.state.selectedSourceComponentToMove;
    if (await sourceComponent === '' && (!await sourceComponent.includes('/'))) {
      this.setState({ isErrorOnSourceComponent: true })
      return await this.getNotification('error', 'Source Component can not be blank.');
    }
    //Verify Name
    var destinationComponent = await this.state.selectedDestinationComponentToMove;
    if (destinationComponent.trim() === '' && (!await destinationComponent.includes('/'))) {
      this.setState({ isErrorOnDestinationComponent: true })
      return await this.getNotification('error', 'Destination Component can not be blank.');
    }
    var allTestID = await this.state.listOfTestIdToMove;
    if(await allTestID.length ===0)
    {
      return await this.getNotification('error', 'Please Select Test to move');
    }
    if(await sourceComponent === await destinationComponent)
    {
      this.setState({ isErrorOnDestinationComponent: true })
      return await this.getNotification('error', 'Source and Destination Component can not be same.');
    }
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigGetter.moveYourTestCases();
    this.setState({ isPageLoading: false });
    if (isSaved) {
      await this.getNotification('success', 'Test cases are successfully moved.');
      await new Promise(wait => setTimeout(wait, 2000));
      await window.location.reload();
    }
    else {
      return await this.getNotification('error', 'Unable to move test cases because of ' + Config.ErrorMessage);
    }
  }



  //****************** End */********************************** */

  render() {
    const selectRowFromUrlTable = {
      mode: 'radio',
      onSelect: this.selectRadioButtonFromURlTable,
      selected: [this.state.selectedRowFromUrlTable]
    };

    return (
      <Page
        className="ConfigurationPage"
        title="Test Configuration"
      >
        {this.state.isPageLoading && <PageLoader sentences={LoaderMessage} height='150%' color="black" />}
        <Fade in={!this.state.isPageLoading}>
          {/* <PageLoader sentences ={LoaderMessage} height ='100%' color ="black" /> */}
          <NotificationSystem ref={this.notificationSystem} />
          <Row>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Test Configuration
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup col>
                      <FormGroup row >
                        <Label sm={4}>
                          Current Test Cycle
                        </Label>
                        <Col sm={6}>
                          <Input type="select" invalid={this.state.isErrorOnCurrentTestCycle} onChange={this.selectTestCycle.bind(this)} name="testCycle" value={this.state.currentTestCycle}>
                            <DropDownOptions options={this.state.listOfTestCycle} />
                          </Input>
                        </Col>
                        <Col >
                          <Button size="sm" color='dark' onClick={this.saveCurrentCycle.bind(this)}>
                            <small>Save</small>
                          </Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={4}>
                          Add New Test Cycle
                        </Label>
                        <Col sm={6}>
                          <Input type="input" invalid={this.state.isErrorOnNewTestCycle} onChange={this.addNewTestCycle.bind(this)} name="newCycle" defaultValue={this.state.newTestCycle}>
                          </Input>
                        </Col>
                        <Col>
                          <Button color='dark' size="sm" onClick={this.saveNewCycle.bind(this)}>
                            <small>Save</small>
                          </Button>
                        </Col>
                      </FormGroup>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Add new environment
                    <ButtonGroup size="sm">
                      <Button color='dark' onClick={this.addNewUrlForEnvironment.bind(this)}>
                        <small>Add</small>
                      </Button>
                      <Button color='info' onClick={this.saveUrlTableData.bind(this)}>
                        <small>Save</small>
                      </Button>
                      <Button color='dark' onClick={this.deleteUrlFromUrlTable.bind(this)}>
                        <small>Delete</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Col>
                    <BootstrapTable
                      keyField='id'
                      data={this.state.envUrlList}
                      columns={EnvironmentURLTableHeader}
                      wrapperClasses="table-responsive"
                      striped
                      hover
                      condensed
                      selectRow={selectRowFromUrlTable}
                      cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                      })}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {Users.isSuperAdmin && (<Col lg={6} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Rename/Delete test component
                    <ButtonGroup size="sm">
                      <Button color='dark' onClick={this.confirmRename.bind(this)}>
                        <small>Rename</small>
                      </Button>
                      <Button color='info' onClick={this.confirmdelete.bind(this)}>
                        <small>Delete</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup col>
                      <Label sm={5}>
                        New Name*
                      </Label>
                      <Col>
                        <Input type="input" invalid={this.state.isErrorOnNewComponentName} onChange={this.addNewComponent.bind(this)} name="newComponnetName" defaultValue={this.state.newComponentName}>
                        </Input>
                      </Col>
                      <Col>
                        <TreeMenu
                          cacheSearch
                          data={this.state.folderTreeData}
                          hasSearch={false}
                          onClickItem={this.selectPlaceHolderFromTree.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            )}
            <Col lg={6} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Move your test cases
                    <ButtonGroup size="sm">
                      <Button color='dark' onClick={this.moveTestCases.bind(this)}>
                        <small>Save</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup col>
                      <Label sm={5}>
                        Component*
                      </Label>
                      <Col>
                        <TreeMenu
                          cacheSearch
                          data={this.state.folderTreeData}
                          hasSearch={false}
                          onClickItem={this.selectSourceComponentFromTree.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup col>
                      <Label sm={5}>
                        Select Test to move
                      </Label>
                      <Col>
                        <Select
                          value={this.state.listOfTestIdToMove}
                          isMulti
                          name="testId"
                          options={this.state.listOfAllTestID}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={this.selectTestScriptsToMove.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup col>
                      <Label sm={5}>
                        New Component*
                      </Label>
                      <Col>
                        <TreeMenu
                          cacheSearch
                          data={this.state.folderTreeData}
                          hasSearch={false}
                          onClickItem={this.selectDestinationComponentFromTree.bind(this)}
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fade>
        <Modal isOpen={this.state.modalForDelete} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggleDeleteModal}>Confirmation</ModalHeader>
          <ModalBody>
            {this.state.confirmationModalMessage}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm">
              <Button color='dark' onClick={this.toggleDeleteModal.bind(this)}>
                <small>Cancel</small>
              </Button>
              <Button color='info' onClick={this.performModalConfirmationAction.bind(this)}>
                <small>Yes</small>
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </Page>
    );
  }
}
export default ConfigurationPage;
