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
} from 'reactstrap';
import { ConfigData } from './ConfigData'
import ConfigGetter from './ConfigGetter'
import { EnvironmentURLTableHeader, EmulatorTableHeader, TestToolTableHeader } from '../../Web/WebPageTableHeader'
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DropDownOptions from '../../../uiLayout/components/DropDownOptions'
import NotificationSystem from 'react-notification-system';
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../LoaderMessage';
import { Config } from '../../../QAautoMATER/Config';
import ReactJson from 'react-json-view'
import  GetData  from '../../../QAautoMATER/funcLib/getData';
import  Matcher  from '../../../QAautoMATER/funcLib/matcher';

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
    if (await Matcher.isValuePresentInArray(await ConfigData.ListOfTestCycle,await testCycleName.toString().trim())) {
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


//****************** End */********************************** */

render() {
  return (
    <Page
      className="ConfigurationPage"
      title="Test Configuration"
    >
      {this.state.isPageLoading && <PageLoader sentences={LoaderMessage} height='100%' color="black" />}
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
                        <Input type="input" invalid={this.state.isErrorOnNewTestCycle} onChange={this.addNewTestCycle.bind(this)} name="newCycle" value={this.state.newTestCycle}>
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
        </Row>
      </Fade>
    </Page>
  );
}
}
export default ConfigurationPage;
