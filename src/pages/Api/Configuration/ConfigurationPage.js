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
import { HttpHeaderTable, AutherizationTableHeader, EnvironmentTableHeader, ComponentURLTableHeader } from './ConfigurationTableHeader'
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import DropDownOptions from '../../../uiLayout/components/DropDownOptions'
import NotificationSystem from 'react-notification-system';
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../LoaderMessage';
import ConfigSetter from './ConfigSetter';
import { Config, Users } from '../../../QAautoMATER/Config';
import Matcher from '../../../QAautoMATER/funcLib/matcher';
import Select from 'react-select';

class ConfigurationPage extends React.Component {
  notificationSystem = React.createRef();
  state = {

    //****** Page Loader ***********************************************************
    isPageLoading: false,

    //****** default Configuration  ***********************************************************
    environmentList: ConfigData.EnvironmentList,
    defaultSelectedEnvironment: ConfigData.DefaultSelectedEnvironment,
    validateDefaultSelectedEnvironment: ConfigData.ValidateDefaultSelectedEnvironment,
    defaultReportTrailCount: ConfigData.DefaultReportTrailCount,
    validatedefaultReportTrailCount: ConfigData.ValidatedefaultReportTrailCount,
    defaultSaveDaysToReport: ConfigData.DefaultSaveDaysToReport,
    validatedeDefaultSaveDaysToReport: ConfigData.ValidatedeDefaultSaveDaysToReport,
    defaultSaveDaysToDevelopment: ConfigData.DefaultSaveDaysToDevelopment,
    validatedeSaveDaysToDevelopment: ConfigData.ValidatedeSaveDaysToDevelopment,
    errorMessageDefaultConfiguration: ConfigData.ErrorMessageDefaultConfiguration,
    maxReportCounter: ConfigData.MaxReportCounter,


    //****** Environment Name  ***********************************************************
    envNameList: ConfigData.EnvNameList,
    selectedEnvRowFromEnvList: ConfigData.SelectedEnvRowFromEnvList,
    isNameValidforEnvironment: true,

    //****** Component URL LIst  ***********************************************************
    envNameForUrl: ConfigData.EnvNameForUrl,
    validateEnvNameFromURL: ConfigData.ValidateEnvNameFromURL,
    selectedRowFromUrlTable: ConfigData.SelectedRowFromUrlTable,
    envUrlList: ConfigData.EnvUrlList,
    isNameValidforUrlTable: true,

    //****** Http Header Data***********************************************************

    httpHeaderData: ConfigData.HttpHeaderData,
    selectedRowFromHttpHeaderTable: ConfigData.SelectedRowFromHttpHeaderTable,
    isKeyValidforHttpHeaderTable: true,

    //****** Autherization Table ***********************************************************
    autherizationTableData: ConfigData.AutherizationTableData,
    selectedRowFromAutherizationTable: ConfigData.SelectedRowFromAutherizationTable,
    isKeyValidforAutherizationTable: true,

    //****** Report Clean up setup *********************************************************************************
    cleanUpEnvironment: ConfigData.CleanUpEnvironment,
    selectedDaysForDelete: ConfigData.SelectedDaysForDelete,
    isErrorOnCleanUpEnvironment: ConfigData.IsErrorOnCleanUpEnvironment,
    isErrorOnDayToDelete: ConfigData.IsErrorOnDayToDelete,

    //*** Rename delete Component**********************************************************/
    selectedComponent: ConfigData.SelectedComponent,
    modalForDelete: false,
    componentList: ConfigData.ComponentList,
    newComponentName: ConfigData.NewComponentName,
    isErrorOnNewComponentName: ConfigData.IsErrorOnNewComponentName,
    confirmationModalMessage: '',
    modalActionName: '',

    //*******Move your Test scripts *******************************************************/
    selectedSourceComponentToMove :ConfigData.SelectedSourceComponentToMove,
    selectedDestinationComponentToMove :ConfigData.SelectedDestinationComponentToMove,
    listOfAllTestID :ConfigData.ListOfAllTestID,
    listOfTestIdToMove :ConfigData.ListOfTestIdToMove,
    isErrorOnDestinationComponent:false,
    isErrorOnDestinationComponent:false,

  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ isPageLoading: true })
    await ConfigGetter.apiConfigPageLoadData();

    //****** default Configuration section  ***********************************************************
    this.setState({ environmentList: ConfigData.EnvironmentList })
    this.setState({ defaultSelectedEnvironment: ConfigData.DefaultSelectedEnvironment })
    this.setState({ validateDefaultSelectedEnvironment: ConfigData.ValidateDefaultSelectedEnvironment })
    this.setState({ defaultReportTrailCount: ConfigData.DefaultReportTrailCount })
    this.setState({ validatedefaultReportTrailCount: ConfigData.ValidatedefaultReportTrailCount })
    this.setState({ defaultSaveDaysToReport: ConfigData.DefaultSaveDaysToReport })
    this.setState({ validatedeDefaultSaveDaysToReport: ConfigData.ValidatedeDefaultSaveDaysToReport })
    this.setState({ defaultSaveDaysToDevelopment: ConfigData.DefaultSaveDaysToDevelopment })
    this.setState({ maxReportCounter: ConfigData.MaxReportCounter })

    //****** Env Name  *********************************************************************************
    this.setState({ envNameList: ConfigData.EnvNameList })
    this.setState({ selectedEnvRowFromEnvList: ConfigData.SelectedEnvRowFromEnvList })

    //****** URL  *********************************************************************************
    this.setState({ envNameForUrl: ConfigData.EnvNameForUrl })
    this.setState({ validateEnvNameFromURL: ConfigData.ValidateEnvNameFromURL });
    this.setState({ selectedRowFromUrlTable: ConfigData.SelectedRowFromUrlTable })
    this.setState({ envUrlList: ConfigData.EnvUrlList, })

    //****** Http Header  *********************************************************************************
    this.setState({ httpHeaderData: ConfigData.HttpHeaderData })
    this.setState({ selectedRowFromHttpHeaderTable: ConfigData.SelectedRowFromHttpHeaderTable })

    //****** Autherization  *********************************************************************************
    this.setState({ autherizationTableData: ConfigData.AutherizationTableData })
    this.setState({ selectedRowFromAutherizationTable: ConfigData.SelectedRowFromAutherizationTable })

    //****** Report Clean up setup *********************************************************************************
    this.setState({ cleanUpEnvironment: ConfigData.CleanUpEnvironment });
    this.setState({ selectedDaysForDelete: ConfigData.SelectedDaysForDelete });
    this.setState({ isErrorOnCleanUpEnvironment: ConfigData.IsErrorOnCleanUpEnvironment });

    //*** Rename delete Component**********************************************************/
    this.setState({ selectedComponent: ConfigData.SelectedComponent });
    this.setState({ componentList: ConfigData.ComponentList });
    this.setState({ newComponentName: ConfigData.NewComponentName });
    this.setState({ isErrorOnNewComponentName: ConfigData.IsErrorOnNewComponentName });

    //*** Move your Test Scripts**********************************************************/
    this.setState({ selectedSourceComponentToMove: ConfigData.SelectedSourceComponentToMove });
    this.setState({ selectedDestinationComponentToMove: ConfigData.SelectedDestinationComponentToMove });
    this.setState({ listOfAllTestID: ConfigData.ListOfAllTestID });
    this.setState({ listOfTestIdToMove: ConfigData.ListOfTestIdToMove });

    this.setState({ isPageLoading: false })

  }

  //************************* Notification ***************************************************************
  async getNotification(level, message) {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level
    });
  }

  //****** Default Configuration ***************************************************

  selectDefaultEnvironment = async (event) => {
    this.setState({ validateDefaultSelectedEnvironment: false })
    var envChoice = await event.target.value;
    if (this.state.defaultSelectedEnvironment !== await envChoice) {

      this.setState({ defaultSelectedEnvironment: await envChoice });
      ConfigData.DefaultSelectedEnvironment = await envChoice;
      if (envChoice.trim() !== '') {
        this.setState({ validateDefaultSelectedEnvironment: false });
        ConfigData.ValidateDefaultSelectedEnvironment = false;
      }
      else {
        this.setState({ validateDefaultSelectedEnvironment: true })
        ConfigData.ValidateDefaultSelectedEnvironment = true;
      }
    }

  };

  selectReportTRailCount = async (event) => {
    this.setState({ ValidatedefaultReportTrailCount: false })
    var reportTrailChoice = await event.target.value;
    if (this.state.defaultReportTrailCount !== await reportTrailChoice) {

      this.setState({ defaultReportTrailCount: await reportTrailChoice });
      ConfigData.DefaultReportTrailCount = await reportTrailChoice;
      if (Number(await reportTrailChoice) > 0 && !reportTrailChoice.includes('.')) {
        this.setState({ validatedefaultReportTrailCount: false })
        ConfigData.ValidatedefaultReportTrailCount = false;
      }
      else {
        this.setState({ validatedefaultReportTrailCount: true })
        ConfigData.ValidatedefaultReportTrailCount = true;
      }

    }

  };

  selectSaveDaysToReport = async (event) => {
    this.setState({ validatedeDefaultSaveDaysToReport: false })
    var reportSaveDayChoice = await event.target.value;
    if (this.state.defaultSaveDaysToReport !== await reportSaveDayChoice) {

      this.setState({ defaultSaveDaysToReport: await reportSaveDayChoice });
      ConfigData.DefaultSaveDaysToReport = await reportSaveDayChoice;
      if (Number(await reportSaveDayChoice) > 0 && !reportSaveDayChoice.includes('.')) {
        this.setState({ validatedeDefaultSaveDaysToReport: false })
        ConfigData.ValidatedeDefaultSaveDaysToReport = false;
      }
      else {
        this.setState({ validatedeDefaultSaveDaysToReport: true })
        ConfigData.ValidatedeDefaultSaveDaysToReport = true;
      }

    }

  };

  selectSaveDaysForDevandExecution = async (event) => {
    this.setState({ validatedeSaveDaysToDevelopment: false })
    var devDaysChoice = await event.target.value;
    if (this.state.defaultSaveDaysToReport !== await devDaysChoice) {

      this.setState({ defaultSaveDaysToDevelopment: await devDaysChoice });
      ConfigData.DefaultSaveDaysToDevelopment = await devDaysChoice;
      if (Number(await devDaysChoice) > 0 && !devDaysChoice.includes('.')) {
        this.setState({ validatedeSaveDaysToDevelopment: false })
        ConfigData.ValidatedeSaveDaysToDevelopment = false;
      }
      else {
        this.setState({ validatedeSaveDaysToDevelopment: true })
        ConfigData.ValidatedeSaveDaysToDevelopment = true;
      }

    }

  };

  saveDefaultConfiguration = async (event) => {
    await event.preventDefault();
    var environment = this.state.defaultSelectedEnvironment;
    var reportTrail = this.state.defaultReportTrailCount;
    var daysSaveToReport = this.state.defaultSaveDaysToReport;
    var daystoSeeforDevelopment = this.state.defaultSaveDaysToDevelopment;
    if (environment.toString().trim() === '') {
      this.setState({ validateDefaultSelectedEnvironment: true })
    }
    if (reportTrail.toString().trim() === '') {
      this.setState({ validatedefaultReportTrailCount: true })
    }
    if (daysSaveToReport.toString().trim() === '') {
      this.setState({ validatedeDefaultSaveDaysToReport: true })
    }
    if (daystoSeeforDevelopment.toString().trim() === '') {
      this.setState({ validatedeSaveDaysToDevelopment: true })
    }
    if (environment.trim() === '' || reportTrail.toString().trim() === '' || daysSaveToReport.toString().trim() === '' || daystoSeeforDevelopment.toString().trim() === '') {
      return await this.getNotification('error', ConfigData.ErrorMessageDefaultConfiguration);
    }
    else if (this.state.validateDefaultSelectedEnvironment || this.state.validatedefaultReportTrailCount || this.state.validatedeDefaultSaveDaysToReport || this.state.validatedeSaveDaysToDevelopment) {
      return await this.getNotification('error', ConfigData.ErrorMessageDefaultConfiguration);
    }
    else {
      this.setState({ isPageLoading: true });
      var isSaved = await ConfigSetter.saveDefaultConfiguration();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        return await this.getNotification('success', ConfigData.SuccessMessageDefaultConfiguration);
      }
      else {
        return await this.getNotification('error', 'Unable to save default configuration because of ' + Config.ErrorMessage);
      }
    }
  }

  //********************* Environment Name section ********************************//

  addNewEnvironmentName = async (event) => {
    await event.preventDefault();
    var envNameList = this.state.envNameList;
    var prevEnvName = ''
    if (envNameList.length > 0) {
      prevEnvName = envNameList[envNameList.length - 1]['name'];
      if (prevEnvName.toString().trim() === "") {
        this.setState({ isNameValidforEnvironment: false });
        return await this.getNotification('error', 'Please add the correct environment name from Environment configuration');
      }
    }
    this.setState({ isNameValidforEnvironment: true });
    var lastId = envNameList.length + 1;
    var newRow = { id: lastId, name: '' }
    this.setState({ envNameList: [...this.state.envNameList, newRow] });
    if (ConfigData.EnvNameList === undefined) {
      ConfigData.EnvNameList = [];
    }
    ConfigData.EnvNameList.push(newRow);
  }

  selectRadioButtonFromTable = (row, isSelect) => {
    if (isSelect) {
      ConfigData.SelectedEnvRowFromEnvList = row.id;
      this.setState({ selectedEnvRowFromEnvList: row.id });
    }

  }

  deleteEnvironmentFromList = async (event) => {
    await event.preventDefault();
    var allEnvironmentName = this.state.envNameList;
    if (allEnvironmentName.length === 0) {
      return await this.getNotification('error', 'No envirionment is found under environment section');
    }
    if (Number(this.state.selectedEnvRowFromEnvList) > 0 && Number(this.state.selectedEnvRowFromEnvList) <= allEnvironmentName.length) {
      var envListAfterDelete = await ConfigGetter.updateRowIdAfterDelete(allEnvironmentName, this.state.selectedEnvRowFromEnvList)
      this.setState({ envNameList: [] }, () => { this.setState({ envNameList: envListAfterDelete }); });
      ConfigData.EnvNameList = envListAfterDelete;
    }
    else {
      return await this.getNotification('error', 'No envirionment is selected for delete.');
    }

  }

  saveNewEnvironment = async (event) => {
    await event.preventDefault();
    var allEnvironmentName = this.state.envNameList;
    if (allEnvironmentName.length === 0) {
      return await this.getNotification('error', 'No envirionment is found under environment section');
    }
    if (this.state.isNameValidforEnvironment) {
      if (allEnvironmentName.length > 0) {
        var envName = allEnvironmentName[allEnvironmentName.length - 1]['name'];
        if (envName.trim() === '') {
          return await this.getNotification('error', 'Please add the correct environment name from environment section');
        }
      }
      ConfigData.EnvNameList = allEnvironmentName;
      this.setState({ isPageLoading: true });
      var isSaved = await ConfigSetter.saveEnvironmentDetails();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        return await this.getNotification('success', 'Environment information is successfully saved.');
      }
      else {
        return await this.getNotification('error', 'Unable to save Environment details because of ' + Config.ErrorMessage);
      }
    }
    else {
      return await this.getNotification('error', 'Please add the correct environment name from environment section');
    }

  }



  //********************* URL section ********************************//

  selectEnvironmentFRomURL = async (event) => {
    this.setState({ validateEnvNameFromURL: false })
    var envChoice = await event.target.value;
    if (this.state.envNameForUrl !== await envChoice) {
      this.setState({ envNameForUrl: await envChoice });
      ConfigData.EnvNameForUrl = await envChoice;
      if (envChoice.trim() !== '') {
        this.setState({ validateEnvNameFromURL: false });
        ConfigData.ValidateEnvNameFromURL = false;
        await ConfigGetter.updateUrlTableData(ConfigData.AllConfigData, await envChoice);
        this.setState({ envUrlList: ConfigData.EnvUrlList })
      }
      else {
        this.setState({ validateEnvNameFromURL: true })
        ConfigData.ValidateEnvNameFromURL = true;
      }
    }

  };

  selectRadioButtonFromURlTable = (row, isSelect) => {
    if (isSelect) {
      ConfigData.SelectedRowFromUrlTable = row.id;
      this.setState({ selectedRowFromUrlTable: row.id });
    }

  }

  addNewUrlForEnvironment = async (event) => {
    await event.preventDefault();
    var envName = this.state.envNameForUrl;
    if (envName.trim() === '') {
      this.setState({ isNameValidforUrlTable: false });
      return await this.getNotification('error', 'Please select environment from URL section');
    }
    var allUrlList = this.state.envUrlList;
    if (allUrlList.length > 0) {
      var prevComponentName = allUrlList[allUrlList.length - 1]['name'];
      var prevComponentUrl = allUrlList[allUrlList.length - 1]['url'];
      if (prevComponentName.toString().trim() === "" || prevComponentUrl.toString().trim() === '') {
        this.setState({ isNameValidforUrlTable: false });
        return await this.getNotification('error', "Please add the correct Component and Url from 'URL' section");
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
    var envName = this.state.envNameForUrl;
    if (envName.trim() === '') {
      this.setState({ isNameValidforUrlTable: false });
      return await this.getNotification('error', 'Please select environment from URL section');
    }
    var allUrlList = this.state.envUrlList;
    if (allUrlList.length === 0) {
      return await this.getNotification('error', 'No Component is found under URL table');
    }
    if (Number(this.state.selectedRowFromUrlTable) > 0 && Number(this.state.selectedRowFromUrlTable) <= allUrlList.length) {
      var urlListAfterDelete = await ConfigGetter.updateRowIdAfterDelete(allUrlList, this.state.selectedRowFromUrlTable)
      this.setState({ envUrlList: [] }, () => { this.setState({ envUrlList: urlListAfterDelete }); });
      ConfigData.EnvUrlList = urlListAfterDelete;
    }
    else {
      this.setState({ isNameValidforUrlTable: false });
      return await this.getNotification('error', 'No Component Url is selected for delete.');
    }
  }

  saveUrlTableData = async (event) => {
    await event.preventDefault();
    var envName = this.state.envNameForUrl;
    if (envName.trim() === '') {
      return await this.getNotification('error', 'No environment is found under URL table');
    }
    var allUrlList = this.state.envUrlList;
    // if (allUrlList.length === 0) {
    //   return await this.getNotification('error', 'No Component is found under URL table');
    // }
    if (this.state.isNameValidforUrlTable) {
      if (allUrlList.length > 0) {
        var componentName = allUrlList[allUrlList.length - 1]['name'];
        var componentUrl = allUrlList[allUrlList.length - 1]['url'];
        if (componentName.trim() === '' || componentUrl.trim() === '') {
          return await this.getNotification('error', "Please add the correct Component and URL in 'URL' table");
        }
      }
      ConfigData.EnvUrlList = allUrlList;
      this.setState({ isPageLoading: true });
      var isSaved = await ConfigSetter.saveURLDetails();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        return await this.getNotification('success', 'Environment Url information is successfully saved.');
      }
      else {
        return await this.getNotification('error', 'Unable to save Environment Url information because of ' + Config.ErrorMessage);
      }

    }
    else {
      return await this.getNotification('error', 'Please add the correct Component and URL in URL table');
    }
  }

  //************************ HTTP Header*************************** */

  selectRadioButtonFromHttpHeaderTable = (row, isSelect) => {
    if (isSelect) {
      ConfigData.SelectedRowFromHttpHeaderTable = row.id;
      this.setState({ selectedRowFromHttpHeaderTable: row.id });
    }

  }

  addHttpHeaderData = async (event) => {
    await event.preventDefault();
    var allHttpHeaderData = this.state.httpHeaderData;
    if (allHttpHeaderData.length > 0) {
      var prevKey = allHttpHeaderData[allHttpHeaderData.length - 1]['key'];
      var prevValue = allHttpHeaderData[allHttpHeaderData.length - 1]['value'];
      if (prevKey.toString().trim() === "" || prevValue.toString().trim() === '') {
        this.setState({ isKeyValidforHttpHeaderTable: false });
        return await this.getNotification('error', "Please add the correct Header key and Value in 'Http Header' section");
      }
    }
    this.setState({ isKeyValidforHttpHeaderTable: true });
    var lastId = allHttpHeaderData.length + 1;
    var newRow = { id: lastId, key: '', value: '' };
    this.setState({ httpHeaderData: [...this.state.httpHeaderData, newRow] });
    ConfigData.HttpHeaderData.push(newRow);

  }

  deleteKeyFromHttpHeaderTable = async (event) => {
    await event.preventDefault();
    var allHttpHeaderData = this.state.httpHeaderData;
    if (allHttpHeaderData.length === 0) {
      return await this.getNotification('error', "No Http header key is found under 'Http Header' table");
    }
    if (Number(this.state.selectedRowFromHttpHeaderTable) > 0 && Number(this.state.selectedRowFromHttpHeaderTable) <= allHttpHeaderData.length) {
      var datafterDelete = await ConfigGetter.updateRowIdAfterDelete(allHttpHeaderData, this.state.selectedRowFromHttpHeaderTable)
      this.setState({ httpHeaderData: await datafterDelete });
      this.setState({ httpHeaderData: [] }, () => { this.setState({ httpHeaderData: datafterDelete }); });
      // return await this.getNotification('success', 'selected Http header key is successfully deleted');
    }
    else {
      this.setState({ isKeyValidforHttpHeaderTable: false });
      return await this.getNotification('error', 'No Http header key is selected for delete.');
    }
  }

  saveHttpHeaderTableData = async (event) => {
    await event.preventDefault();
    var allHttpHeaderData = this.state.httpHeaderData;
    // if (allHttpHeaderData.length === 0) {
    //   return await this.getNotification('error', 'No Http Header key is found under URL table');
    // }
    if (this.state.isKeyValidforHttpHeaderTable) {
      if (await allHttpHeaderData.length > 0) {
        var headerKey = allHttpHeaderData[allHttpHeaderData.length - 1]['key'];
        var headerValue = allHttpHeaderData[allHttpHeaderData.length - 1]['value'];
        if (headerKey.trim() === '' || headerValue.trim() === '') {
          return await this.getNotification('error', "Please add the correct http header key and value in 'Http Header' table");
        }
      }
      ConfigData.HttpHeaderData = allHttpHeaderData;
      this.setState({ isPageLoading: true });;
      var isSaved = await ConfigSetter.saveHttpHeaderDetails();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        return await this.getNotification('success', 'Http header information is successfully saved.');
      }
      else {
        return await this.getNotification('error', 'Unable to save Http header information because of ' + Config.ErrorMessage);
      }

    }
    else {
      return await this.getNotification('error', 'Please add the correct details in HTTP Header table');
    }
  }

  ////********************** Autherization***************************** */

  selectRadioButtonFromAutherizationTable = (row, isSelect) => {
    if (isSelect) {
      ConfigData.SelectedRowFromAutherizationTable = row.id;
      this.setState({ selectedRowFromAutherizationTable: row.id });
    }

  }

  addAutherizationData = async (event) => {
    await event.preventDefault();
    var tableData = this.state.autherizationTableData;
    if (tableData.length > 0) {
      var prevKey = tableData[tableData.length - 1]['key'];
      var prevUserName = tableData[tableData.length - 1]['username'];
      var prevPassword = tableData[tableData.length - 1]['password'];
      if (prevKey.toString().trim() === "" || prevUserName.toString().trim() === '' || prevPassword.toString().trim() === '') {
        this.setState({ isKeyValidforAutherizationTable: false });
        return await this.getNotification('error', "Please add the correct Autherization key, username and password in 'Autherization' table");
      }
    }
    this.setState({ isKeyValidforAutherizationTable: true });
    var lastId = tableData.length + 1;
    var newRow = { id: lastId, key: '', username: '', password: '' };
    this.setState({ autherizationTableData: [...this.state.autherizationTableData, newRow] });
    ConfigData.AutherizationTableData.push(newRow);
  }

  deleteKeyFromAutherizationTable = async (event) => {
    await event.preventDefault();
    var tableData = this.state.autherizationTableData;
    if (tableData.length === 0) {
      return await this.getNotification('error', "No Autherization key is found under 'Autherization' table");
    }
    if (Number(this.state.selectedRowFromAutherizationTable) > 0 && Number(this.state.selectedRowFromAutherizationTable) <= tableData.length) {
      var datafterDelete = await ConfigGetter.updateRowIdAfterDelete(tableData, this.state.selectedRowFromAutherizationTable)
      this.setState({ autherizationTableData: [] }, () => { this.setState({ autherizationTableData: datafterDelete }); });
      ConfigData.AutherizationTableData = datafterDelete;
    }
    else {
      this.setState({ isKeyValidforAutherizationTable: false });
      return await this.getNotification('error', 'No autherization key is selected for delete.');
    }
  }

  saveAutherizationTableData = async (event) => {
    await event.preventDefault();
    var tableData = this.state.autherizationTableData;
    // if (tableData.length === 0) {
    //   return await this.getNotification('error', 'No Autherization key is found under Autherization table');
    // }

    if (this.state.isKeyValidforAutherizationTable) {
      if (tableData.length > 0) {
        var key = tableData[tableData.length - 1]['key'];
        var userName = tableData[tableData.length - 1]['username'];
        var password = tableData[tableData.length - 1]['password'];
        if (key.trim() === '' || userName.trim() === '' || password.trim() === '') {
          return await this.getNotification('error', "Please add the correct Authorization key, username and password in 'Autherization' table");
        }
      }
      ConfigData.AutherizationTableData = tableData;
      this.setState({ isPageLoading: true });
      var isSaved = await ConfigSetter.saveAuthorizationDetails();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        return await this.getNotification('success', 'Authorization information is successfully saved.');
      }
      else {
        return await this.getNotification('error', 'Unable to save Authorization information because of ' + Config.ErrorMessage);
      }

    }
    else {
      return await this.getNotification('error', 'Please add the correct AUTHORIZATION details in');
    }
  }

  //****** Clean Up Configuration***************************************************

  selectCleanUpEnvironment = async (event) => {
    this.setState({ isErrorOnCleanUpEnvironment: false })
    var dataChoice = await event.target.value;
    if (this.state.cleanUpEnvironment !== await dataChoice) {
      this.setState({ cleanUpEnvironment: await dataChoice });
      ConfigData.CleanUpEnvironment = await dataChoice;
    }
  };

  selectKeepDaysToDate = async (event) => {
    this.setState({ isErrorOnDayToDelete: false })
    var dataChoice = await event.target.value;
    if (this.state.selectedDaysForDelete !== await dataChoice) {
      this.setState({ selectedDaysForDelete: await dataChoice });
      ConfigData.SelectedDaysForDelete = await dataChoice;
    }
  };

  deleteReportForDays = async (event) => {
    await event.preventDefault();
    var envforDelete = this.state.cleanUpEnvironment;
    if (await envforDelete === '') {
      this.setState({ isErrorOnCleanUpEnvironment: true });
      return await this.getNotification('error', "Please select environment first.");
    }
    var daysToDelete = this.state.selectedDaysForDelete;
    if (await daysToDelete === '') {
      this.setState({ isErrorOnDayToDelete: true });
      return await this.getNotification('error', "Please select environment first.");
    }
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigSetter.deleteReportData(await envforDelete, await daysToDelete);
    this.setState({ isPageLoading: false });
    if (isSaved) {
      return await this.getNotification('success', 'Report data is successfully cleanup.');
    }
    else {
      return await this.getNotification('error', 'Unable to delete report data because of ' + Config.ErrorMessage);
    }


  }

  deleteAllReports = async (event) => {
    await event.preventDefault();
    var envforDelete = this.state.cleanUpEnvironment;
    if (await envforDelete === '') {
      this.setState({ isErrorOnCleanUpEnvironment: true });
      return await this.getNotification('error', "Please select environment first.");
    }
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigSetter.deleteReportData(await envforDelete, 'All Days');
    this.setState({ isPageLoading: false });
    if (isSaved) {
      return await this.getNotification('success', 'Report data is successfully cleanup.');
    }
    else {
      return await this.getNotification('error', 'Unable to delete report data because of ' + Config.ErrorMessage);
    }

  }

  /////*********** Rename/Delete Component****************************** */

  confirmdelete = async (event) => {
    await event.preventDefault();
    var folderToDelete = await ConfigData.SelectedComponent;
    if (await folderToDelete === '') {
      return await this.getNotification('error', 'Please select component which needs to be deleted.');
    }
    this.setState({ modalActionName: 'Delete' });
    this.setState({ confirmationModalMessage: ConfigData.ComponentDeleteMessage });
    this.setState({ modalForDelete: true });
  }

  toggleDeleteModal = async () => {
    this.setState({ modalForDelete: false });
  }

  deleteComponent = async (event) => {
    await event.preventDefault();
    this.setState({ isPageLoading: true });
    var isSaved = await ConfigGetter.deleteAPIComponent();
    this.setState({ isPageLoading: false });
    if (isSaved) {
      this.setState({ modalForDelete: false });
      ConfigData.SelectedComponent = ''
      this.setState({ selectedComponent: '' })
      await this.getNotification('success', 'Components and all test cases, along with the subcomponents inside them, are successfully deleted.');
      await new Promise(wait => setTimeout(wait, 2000));
      await window.location.reload();
    }
    else {
      this.setState({ modalForDelete: false });
      return await this.getNotification('error', 'Unable to delete component because of ' + Config.ErrorMessage);
    }
  }

  performModalConfirmationAction = async (event) => {
    await event.preventDefault();
    var actionName = this.state.modalActionName;
    var Message ='';
    switch (await actionName) {
      case "Delete":
        this.setState({ isPageLoading: true });
        var isSaved = await ConfigGetter.deleteAPIComponent();
        this.setState({ isPageLoading: false });
        Message ='Components and all test cases, along with the subcomponents inside them, are successfully deleted.'
        break;
      case "Rename":
        this.setState({ isPageLoading: true });
        var isSaved = await ConfigGetter.renameAPIAutomationComponent();
        this.setState({ isPageLoading: false });
        Message ='Test case component are successfully updated.'
        break;
      default:
        return;
    }

    if (await isSaved) {
      this.setState({ modalForDelete: false });
      this.setState({ modalActionName: '' })
      ConfigData.SelectedComponent = ''
      this.setState({ selectedComponent: '' })
      await this.getNotification('success', await Message);
      await new Promise(wait => setTimeout(wait, 2000));
      await window.location.reload();
    }
    else {
      this.setState({ modalForDelete: false });
      return await this.getNotification('error', 'Unable to ' + await actionName + ' component because of ' + Config.ErrorMessage);
    }
  }

  selectComponent = async (event) => {
    var selectedComponent = await event.target.value;
    if (this.state.selectedComponent !== await selectedComponent) {
      this.setState({ selectedComponent: await selectedComponent })
      ConfigData.SelectedComponent = await selectedComponent;
    }

  };

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
    var folderToRename = await ConfigData.SelectedComponent;
    if (await folderToRename === '') {
      return await this.getNotification('error', 'Please select component which needs to be renamed.');
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
    var isAleadyExist = await Matcher.isValuePresentInArray(ConfigData.ComponentList, await newName.trim());
    if (await isAleadyExist) {
      this.setState({ isErrorOnNewComponentName: true })
      return await this.getNotification('error', 'New Component Name is already exist on the server.Please choose different name.');
    }
    this.setState({ modalActionName: 'Rename' });
    this.setState({ confirmationModalMessage: ConfigData.ComponentRenameMessage });
    this.setState({ modalForDelete: true });
  }

    //************* Move your test scripts Features *****************************************/

    selectSourceComponent = async (event) => {
      this.setState({isErrorOnSourceComponent:false})
      var selectedComponent = await event.target.value;
      if (this.state.selectedSourceComponentToMove !== await selectedComponent) {
        this.setState({ selectedSourceComponentToMove: await selectedComponent })
        ConfigData.SelectedSourceComponentToMove = await selectedComponent;
        if(await selectedComponent !=='')
        {
          //** get lis of Test ID */
          var output = ConfigGetter.getListOfTestCaseFromComponent(await selectedComponent);
          ConfigData.ListOfAllTestID = await output;
          this.setState({listOfAllTestID:await output})
        }
      }
  
    };
  
    selectDestinationComponent = async (event) => {
      this.setState({isErrorOnDestinationComponent:false})
      var selectedComponent = await event.target.value;
      if (this.state.selectedDestinationComponentToMove !== await selectedComponent) {
        this.setState({ selectedDestinationComponentToMove: await selectedComponent })
        ConfigData.SelectedDestinationComponentToMove = await selectedComponent;
      }
  
    };
  
    selectTestScriptsToMove = async (event) => {
      this.setState({listOfTestIdToMove:[]})
       ConfigData.ListOfTestIdToMove = await event;
       this.setState({listOfTestIdToMove:await event});
    };
  
    moveTestScripts = async (event) => {
      await event.preventDefault();
      var sourceComponent = await this.state.selectedSourceComponentToMove;
      if (await sourceComponent === '') {
        this.setState({ isErrorOnSourceComponent: true })
        return await this.getNotification('error', 'Source Component can not be blank.');
      }
      //Verify Name
      var destinationComponent = await this.state.selectedDestinationComponentToMove;
      if (destinationComponent.trim() === '') {
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
      var isSaved = await ConfigSetter.moveYourTestScripts();
      this.setState({ isPageLoading: false });
      if (isSaved) {
        await this.getNotification('success', 'Test scripts are successfully moved.');
        await new Promise(wait => setTimeout(wait, 2000));
        await window.location.reload();
      }
      else {
        return await this.getNotification('error', 'Unable to move test scripts because of ' + Config.ErrorMessage);
      }
    }

  //****************** End */********************************** */

  render() {
    const selectEnvListTableRow = {
      mode: 'radio',
      onSelect: this.selectRadioButtonFromTable,
      selected: [this.state.selectedEnvRowFromEnvList]
    };
    const selectRowFromUrlTable = {
      mode: 'radio',
      onSelect: this.selectRadioButtonFromURlTable,
      selected: [this.state.selectedRowFromUrlTable]
    };
    const selectRowFromHttpHeaderTable = {
      mode: 'radio',
      onSelect: this.selectRadioButtonFromHttpHeaderTable,
      selected: [this.state.selectedRowFromHttpHeaderTable]
    };
    const selectRowFromAutherizationTable = {
      mode: 'radio',
      onSelect: this.selectRadioButtonFromAutherizationTable,
      selected: [this.state.selectedRowFromAutherizationTable]
    };
    return (
      <Page
        className="ConfigurationPage"
        title="Api Configuration"
      >
        {this.state.isPageLoading && <PageLoader sentences={LoaderMessage} height='150%' color="black" />}
        <Fade in={!this.state.isPageLoading}>
          {/* <PageLoader sentences ={LoaderMessage} height ='100%' color ="black" /> */}
          <NotificationSystem ref={this.notificationSystem} />
          <Row>
            <Col lg={4} md={6} sm={6} xs={12}>
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
                        <Input type="select" invalid={this.state.validateDefaultSelectedEnvironment} onChange={this.selectDefaultEnvironment.bind(this)} name="defaultenvironment" value={this.state.defaultSelectedEnvironment}>
                          <DropDownOptions options={this.state.environmentList} />
                        </Input>
                      </Col>
                      <Label sm={10}>
                        Report trail count to show
                      </Label>
                      <Col>
                        <Input type="number" invalid={this.state.validatedefaultReportTrailCount} onChange={this.selectReportTRailCount.bind(this)} name="defaultreporttrail" value={this.state.defaultReportTrailCount} max={this.state.maxReportCounter} min={0}>
                        </Input>
                      </Col>
                      <Label sm={10}>
                        Days save to report
                      </Label>
                      <Col>
                        <Input type="number" name="defaultDaysToSave" invalid={this.state.validatedeDefaultSaveDaysToReport} value={this.state.defaultSaveDaysToReport} onChange={this.selectSaveDaysToReport.bind(this)} max={this.state.maxReportCounter} min={0}>
                        </Input>
                      </Col>
                      <Label sm={10}>
                        Days to see development/execution count
                      </Label>
                      <Col>
                        <Input type="number" name="defaultDevexeDays" invalid={this.state.validatedeSaveDaysToDevelopment} value={this.state.defaultSaveDaysToDevelopment} onChange={this.selectSaveDaysForDevandExecution.bind(this)} max={this.state.maxReportCounter} min={0}>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Environment
                    <ButtonGroup size="sm">
                      <Button color='black' onClick={this.addNewEnvironmentName.bind(this)}>
                        <small>Add</small>
                      </Button>
                      <Button color='info' onClick={this.saveNewEnvironment.bind(this)}>
                        <small>Save</small>
                      </Button>
                      <Button color='black' onClick={this.deleteEnvironmentFromList.bind(this)}>
                        <small>Delete</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Col>
                    <BootstrapTable
                      keyField='id'
                      data={this.state.envNameList}
                      columns={EnvironmentTableHeader}
                      wrapperClasses="table-responsive"
                      striped
                      hover
                      condensed
                      selectRow={selectEnvListTableRow}
                      cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                      })}
                    // pagination={paginationFactory(PagiNationData)}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col lg={5} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    URL
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
                  <Label sm={5}>
                    Environment
                  </Label>
                  <Col>
                    <Input type="select" invalid={this.state.validateEnvNameFromURL} onChange={this.selectEnvironmentFRomURL.bind(this)} name="envNameFromURL" value={this.state.envNameForUrl}>
                      <DropDownOptions options={this.state.environmentList} />
                    </Input>
                  </Col>
                  <Col>
                    <BootstrapTable
                      keyField='id'
                      data={this.state.envUrlList}
                      columns={ComponentURLTableHeader}
                      wrapperClasses="table-responsive"
                      striped
                      hover
                      condensed
                      selectRow={selectRowFromUrlTable}
                      cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                      })}
                    // pagination={paginationFactory(PagiNationData)}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Http Header
                    <ButtonGroup size="sm">
                      <Button color='black' onClick={this.addHttpHeaderData.bind(this)}>
                        <small>Add</small>
                      </Button>
                      <Button color='info' onClick={this.saveHttpHeaderTableData.bind(this)}>
                        <small>Save</small>
                      </Button>
                      <Button color='black' onClick={this.deleteKeyFromHttpHeaderTable.bind(this)}>
                        <small>Delete</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Col>
                    <BootstrapTable
                      keyField='id'
                      data={this.state.httpHeaderData}
                      columns={HttpHeaderTable}
                      wrapperClasses="table-responsive"
                      striped
                      hover
                      condensed
                      selectRow={selectRowFromHttpHeaderTable}
                      cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                      })}
                    // pagination={paginationFactory(PagiNationData)}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Authorization
                    <ButtonGroup size="sm">
                      <Button color='black' onClick={this.addAutherizationData.bind(this)}>
                        <small>Add</small>
                      </Button>
                      <Button color='info' onClick={this.saveAutherizationTableData.bind(this)}>
                        <small>Save</small>
                      </Button>
                      <Button color='black' onClick={this.deleteKeyFromAutherizationTable.bind(this)}>
                        <small>Delete</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Col>
                    <BootstrapTable
                      keyField='id'
                      data={this.state.autherizationTableData}
                      columns={AutherizationTableHeader}
                      wrapperClasses="table-responsive"
                      striped
                      hover
                      condensed
                      selectRow={selectRowFromAutherizationTable}
                      cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true,
                      })}
                    // pagination={paginationFactory(PagiNationData)}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Cleanup Reports
                    <ButtonGroup size="sm">
                      <Button color='black' onClick={this.deleteReportForDays.bind(this)}>
                        <small>Save</small>
                      </Button>
                      <Button color='info' onClick={this.deleteAllReports.bind(this)}>
                        <small>Delete All</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup row>
                      <Label sm={5}>
                        Environment
                      </Label>
                      <Col>
                        <Input type="select" invalid={this.state.isErrorOnCleanUpEnvironment} onChange={this.selectCleanUpEnvironment.bind(this)} name="cleanUpEnvironment" value={this.state.cleanUpEnvironment}>
                          <DropDownOptions options={this.state.environmentList} />
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={5}>
                        Keep Report Data (timeline)
                      </Label>
                      <Col>
                        <Input type="select" invalid={this.state.isErrorOnDayToDelete} onChange={this.selectKeepDaysToDate.bind(this)} name="keepReportData" value={this.state.selectedDaysForDelete}>
                          <option>7 Days</option>
                          <option>14 Days</option>
                          <option>30 Days</option>
                          <option>45 Days</option>
                          <option>60 Days</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            {Users.isSuperAdmin && (
              <Col lg={6} md={12} sm={12} xs={12}>
                <Card>
                  <CardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                      Rename/Delete test component
                      <ButtonGroup size="sm">
                        <Button color='black' onClick={this.confirmRename.bind(this)}>
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
                        <Label sm={6}>
                          Component*
                        </Label>
                        <Col>
                          <Input type="select" onChange={this.selectComponent.bind(this)} name="componentList" value={this.state.selectedComponent}>
                            <DropDownOptions options={this.state.componentList} />
                          </Input>
                        </Col>
                        <Label sm={5}>
                        New Name*
                      </Label>
                      <Col>
                        <Input type="input" invalid={this.state.isErrorOnNewComponentName} onChange={this.addNewComponent.bind(this)} name="newComponnetName" defaultValue={this.state.newComponentName}>
                        </Input>
                      </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
          <Row>
          <Col lg={6} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Move your test scripts
                    <ButtonGroup size="sm">
                      <Button color='black' onClick={this.moveTestScripts.bind(this)}>
                        <small>Save</small>
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup col>
                      <Label sm={6}>
                        Component*
                      </Label>
                      <Col>
                        <Input type="select" invalid={this.state.isErrorOnSourceComponent} onChange={this.selectSourceComponent.bind(this)} name="componentList" value={this.state.selectedSourceComponentToMove}>
                        <option></option>
                          <DropDownOptions options={this.state.componentList} />
                        </Input>
                      </Col>
                      <Label sm={5}>
                        Select Test to move
                      </Label>
                      <Col>
                          <Select
                            defaultValue={this.state.listOfTestIdToMove}
                            isMulti
                            name="testId"
                            options={this.state.listOfAllTestID}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.selectTestScriptsToMove.bind(this)}
                          />
                        </Col>
                      <Label sm={6}>
                        Select Component to Move
                      </Label>
                      <Col>
                        <Input invalid={this.state.isErrorOnDestinationComponent} type="select" onChange={this.selectDestinationComponent.bind(this)} name="componentList" value={this.state.selectedDestinationComponentToMove}>
                          <option></option>
                          <DropDownOptions options={this.state.componentList} />
                        </Input>
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
              <Button color='black' onClick={this.toggleDeleteModal.bind(this)}>
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
