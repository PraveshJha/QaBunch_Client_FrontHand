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
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DropDownOptions from '../../../uiLayout/components/DropDownOptions'
import NotificationSystem from 'react-notification-system';
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../LoaderMessage';
import { Config, Users } from '../../../QAautoMATER/Config';
import { EnvironmentURLTableHeader } from '../MobilePageTableHeader'
import Select from 'react-select';

class ConfigurationPage extends React.Component {
  notificationSystem = React.createRef();
  state = {

    //****** Page Loader ***********************************************************
    isPageLoading: false,

    //****** default Configuration  ***********************************************************
    environmentList: ConfigData.EnvironmentList,
    isErrorOnDefaultSelectedEnvironment:false,
    defaultSelectedEnvironment:ConfigData.DefaultSelectedEnvironment,
    maxReportCounter:ConfigData.MaxReportCounter,
    defaultReportTrailCount:ConfigData.DefaultReportTrailCount,
    isErrorOnReportTrailCount:false,
    defaultSaveDaysToReport:ConfigData.DefaultSaveDaysToReport,
    isErrorOnDaysSavetoReport:false,
    defaultSaveDaysToDevelopment:ConfigData.DefaultSaveDaysToDevelopment,
    isErrorOnDayToSeeDevelopment:false,
    screenshotOptionList:ConfigData.ScreenshotOptionList,
    selectedScreenshot:ConfigData.SelectedScreenshot,
    isErroronDefaultDecice:false,
    deviceList:ConfigData.DeviceList,
    defaultDevice:ConfigData.DefaultDevice,

    //****** Add New Environment ***********************************************************
    envUrlList:ConfigData.EnvUrlList,
    selectedRowFromUrlTable:ConfigData.SelectedRowFromUrlTable,
    isNameValidforUrlTable:true,

  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ isPageLoading: true });
    await ConfigGetter.mobileConfigPageLoadData();

    //****** default Configuration  ***********************************************************
    this.setState({ environmentList: ConfigData.EnvironmentList })
    this.setState({ defaultSelectedEnvironment: ConfigData.DefaultSelectedEnvironment })
    this.setState({ maxReportCounter: ConfigData.MaxReportCounter })
    this.setState({ defaultReportTrailCount: ConfigData.DefaultReportTrailCount })
    this.setState({ defaultSaveDaysToReport: ConfigData.DefaultSaveDaysToReport })
    this.setState({ defaultSaveDaysToDevelopment: ConfigData.DefaultSaveDaysToDevelopment })
    this.setState({ screenshotOptionList: ConfigData.ScreenshotOptionList })
    this.setState({ selectedScreenshot: ConfigData.SelectedScreenshot })
    this.setState({ deviceList: ConfigData.DeviceList })
    this.setState({ defaultDevice: ConfigData.DefaultDevice })

    //****** Add New Environment ***********************************************************
    this.setState({ envUrlList: ConfigData.EnvUrlList })
    this.setState({ selectedRowFromUrlTable: ConfigData.SelectedRowFromUrlTable })

    //**** Page Load at End */
    this.setState({ isPageLoading: false });

  }

  //************************* Notification ***************************************************************
  async getNotification(level, message) {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level
    });
  }

  //****** Default Configuration **************************************************************************

  selectDefaultEnvironment = async (event) => {
    this.setState({ isErrorOnDefaultSelectedEnvironment: false })
    var envChoice = await event.target.value;
    if (this.state.defaultSelectedEnvironment !== await envChoice) {
      this.setState({ defaultSelectedEnvironment: await envChoice });
      ConfigData.DefaultSelectedEnvironment = await envChoice;
    }
  };

  selectReportTRailCount = async (event) => {
    this.setState({ isErrorOnReportTrailCount: false })
    var reportTrailChoice = await event.target.value;
    if (this.state.defaultReportTrailCount !== await reportTrailChoice) {
      this.setState({ defaultReportTrailCount: await reportTrailChoice });
      ConfigData.DefaultReportTrailCount = await reportTrailChoice;
    }

  };

  selectSaveDaysToReport = async (event) => {
    this.setState({ isErrorOnDaysSavetoReport: false })
    var reportSaveDayChoice = await event.target.value;
    if (this.state.defaultSaveDaysToReport !== await reportSaveDayChoice) {
      this.setState({ defaultSaveDaysToReport: await reportSaveDayChoice });
      ConfigData.DefaultSaveDaysToReport = await reportSaveDayChoice;
    }

  };

  selectSaveDaysForDevandExecution = async (event) => {
    this.setState({ isErrorOnDayToSeeDevelopment: false })
    var devDaysChoice = await event.target.value;
    if (this.state.defaultSaveDaysToReport !== await devDaysChoice) {
      this.setState({ defaultSaveDaysToDevelopment: await devDaysChoice });
      ConfigData.DefaultSaveDaysToDevelopment = await devDaysChoice;
    }

  };

  selectScreenshotOption = async (event) => {
    var envChoice = await event.target.value;
    if (this.state.selectedScreenshot !== await envChoice) {
      this.setState({ selectedScreenshot: await envChoice });
      ConfigData.SelectedScreenshot = await envChoice;
    }
  };

  selectDefaultDevice = async (event) => {
    var envChoice = await event.target.value;
    this.setState({isErroronDefaultDecice:false})
    if (this.state.defaultDevice !== await envChoice) {
      this.setState({ defaultDevice: await envChoice });
      ConfigData.DefaultDevice = await envChoice;
    }
  };

  saveDefaultConfiguration = async (event) => {
    await event.preventDefault();
    var environment = this.state.defaultSelectedEnvironment;
    var reportTrail = this.state.defaultReportTrailCount;
    var daysSaveToReport = this.state.defaultSaveDaysToReport;
    var daystoSeeforDevelopment = this.state.defaultSaveDaysToDevelopment;
    var defaultDevice = this.state.defaultDevice;
    var screenshotOption = this.state.selectedScreenshot;
    var errorMessage ='';
    if (environment.toString().trim() === '') {
      this.setState({ isErrorOnDefaultSelectedEnvironment: true })
      errorMessage ='Environment.'
    }
    if (Number(await reportTrail) ===0) {
      this.setState({ isErrorOnReportTrailCount: true })
      errorMessage =errorMessage+'Report trail count to show.'
    }
    if (Number(daysSaveToReport) === 0) {
      this.setState({ isErrorOnDaysSavetoReport: true })
      errorMessage =errorMessage+'Days save to report.'
    }
    if (Number(daystoSeeforDevelopment) === 0) {
      this.setState({ isErrorOnDayToSeeDevelopment: true })
      errorMessage =errorMessage+'Days to see development/execution count.'
    }
    if (defaultDevice.toString().trim() === '') {
      this.setState({ isErroronDefaultDecice: true })
      errorMessage =errorMessage+'Device.'
    }
    if (await errorMessage !=='') {
      return await this.getNotification('error', 'Please fill the highlited value on Default Configuration section.');
    }
    if (await reportTrail.toString().includes('.')) {
      this.setState({ isErrorOnReportTrailCount: true })
      errorMessage =errorMessage+'Report trail count to show.'
    }
    if (daysSaveToReport.toString().includes('.')) {
      this.setState({ isErrorOnDaysSavetoReport: true })
      errorMessage =errorMessage+'Days save to report.'
    }
    if (daystoSeeforDevelopment.toString().includes('.')) {
      this.setState({ isErrorOnDayToSeeDevelopment: true })
      errorMessage =errorMessage+'Days to see development/execution count.'
    }
    if (await errorMessage !=='') {
      return await this.getNotification('error', 'Please fill the highlited value on Default Configuration section.');
    }
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigGetter.saveDefaultConfiguration();
    this.setState({ isPageLoading: false });
    if (isSaved) {
      return await this.getNotification('success', 'Default configuration values are successfully saved.');
    }
    else {
      return await this.getNotification('error', 'Unable to save default configuration because of ' + Config.ErrorMessage);
    }
  }

  //********************* Add New Environment section ********************************//

  selectRadioButtonFromURlTable = async (row, isSelect) => {
    if (await isSelect) {
      ConfigData.SelectedRowFromUrlTable = await row.id;
      this.setState({ selectedRowFromUrlTable: await row.id });
    }
  }

  addNewUrlForEnvironment = async (event) => {
    await event.preventDefault();
    var allUrlList = await this.state.envUrlList;
    if (await allUrlList.length > 0) {
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
      return await this.getNotification('error', "Please add the correct Component and URL in 'ADD NEW ENVIRONMENT' table");
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
        title="Mobile Configuration"
      >
        {this.state.isPageLoading && <PageLoader sentences={LoaderMessage} height='150%' color="black" />}
        <Fade in={!this.state.isPageLoading}>
          <NotificationSystem ref={this.notificationSystem} />
          <Row>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Default Configuration
                    <Button size="sm" color='black' onClick={this.saveDefaultConfiguration.bind(this)}>
                      <small>Save</small>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup col>
                      <Label sm={5}>
                        Environment
                      </Label>
                      <Col>
                        <Input type="select" invalid={this.state.isErrorOnDefaultSelectedEnvironment} onChange={this.selectDefaultEnvironment.bind(this)} name="defaultenvironment" value={this.state.defaultSelectedEnvironment}>
                          <DropDownOptions options={this.state.environmentList} />
                        </Input>
                      </Col>
                      <Label sm={10}>
                        Report trail count to show
                      </Label>
                      <Col>
                        <Input type="number" invalid={this.state.isErrorOnReportTrailCount} onChange={this.selectReportTRailCount.bind(this)} name="defaultreporttrail" value={this.state.defaultReportTrailCount} max={this.state.maxReportCounter} min={0}>
                        </Input>
                      </Col>
                      <Label sm={10}>
                        Days save to report
                      </Label>
                      <Col>
                        <Input type="number" name="defaultDaysToSave" invalid={this.state.isErrorOnDaysSavetoReport} value={this.state.defaultSaveDaysToReport} onChange={this.selectSaveDaysToReport.bind(this)} max={this.state.maxReportCounter} min={0}>
                        </Input>
                      </Col>
                      <Label sm={10}>
                        Days to see development/execution count
                      </Label>
                      <Col>
                        <Input type="number" name="defaultDevexeDays" invalid={this.state.isErrorOnDayToSeeDevelopment} value={this.state.defaultSaveDaysToDevelopment} onChange={this.selectSaveDaysForDevandExecution.bind(this)} max={this.state.maxReportCounter} min={0}>
                        </Input>
                      </Col>
                      <Label sm={5}>
                        Screenshot
                      </Label>
                      <Col>
                        <Input type="select" onChange={this.selectScreenshotOption.bind(this)} name="screenshotOption" value={this.state.selectedScreenshot}>
                          <DropDownOptions options={this.state.screenshotOptionList} />
                        </Input>
                      </Col>
                      <Label sm={5}>
                        Device
                      </Label>
                      <Col>
                        <Input type="select" invalid={this.state.isErroronDefaultDecice} onChange={this.selectDefaultDevice.bind(this)} name="deviceList" value={this.state.defaultDevice}>
                          <DropDownOptions options={this.state.deviceList} />
                        </Input>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Add new environment
                    <ButtonGroup size="sm">
                      <Button color='black' onClick={this.addNewUrlForEnvironment.bind(this)}>
                        <small>Add</small>
                      </Button>
                      <Button color='info' onClick={this.saveUrlTableData.bind(this)}>
                        <small>Save</small>
                      </Button>
                      <Button color='black' onClick={this.deleteUrlFromUrlTable.bind(this)}>
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
        </Fade>
      </Page>
    );
  }
}
export default ConfigurationPage;
