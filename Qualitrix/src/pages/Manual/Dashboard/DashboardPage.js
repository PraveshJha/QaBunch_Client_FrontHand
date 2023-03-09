import Page from '../../Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  ButtonGroup,
  Fade,
  Form,
  Label,
  Input,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  div,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardTitle,
  CardText,
  ModalFooter
} from 'reactstrap';
import { TextWidget, NumberWidget } from '../../../uiLayout/components/widget';
import { DashboardData } from './DashboardData'
import DashboardGetter from './DashboardGetter';
import { Config, Users } from '../../../QAautoMATER/Config';
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import NotificationSystem from 'react-notification-system';
import "react-widgets/styles.css";
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../LoaderMessage';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-widgets/styles.css";
import { TestCaseTableHeader, TestCaseCommentHeader, TestCaseHistoryHeader, DefectTableHeader } from '../WebPageTableHeader'
import DropDownOptions from '../../../uiLayout/components/DropDownOptions'
import TreeMenu from 'react-simple-tree-menu';
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import { TestScriptData } from '../../Web/TestScript/TestScriptData';
import TestScriptGetter from '../../Web/TestScript/TestScriptGetter';
import { Combobox } from 'react-widgets'
import { TestCaseData } from '../TestCase/TestCaseData';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const selectedProject = Config.SelectedProject;
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

class DefectPage extends React.Component {
  notificationSystem = React.createRef();
  constructor(props) {
    super(props);
    this.state = {

      //****** Page Loader ***********************************************************
      isPageLoading: false,

      //************Widget Data*******************************************************
      totalTestCase:DashboardData.TotalTestCase,
      totalDefects:DashboardData.TotalDefects,
      totalTestPlan:DashboardData.TotalTestPlan,
      totalTestCaseOnLastExecution:DashboardData.TotalTestCaseOnLastExecution,
      passPercentageInLastExecution:DashboardData.PassPercentageInLastExecution,

    };

  }
  componentDidMount = async () => {
    await window.scrollTo(0, 0);
    this.setState({ isPageLoading: true })
    await DashboardGetter.loadDashboardPage();

    //************Widget Data*******************************************************
    this.setState({totalTestCase:DashboardData.TotalTestCase})
    this.setState({totalDefects:DashboardData.TotalDefects})
    this.setState({totalTestPlan:DashboardData.TotalTestPlan})
    this.setState({totalTestCaseOnLastExecution:DashboardData.TotalTestCaseOnLastExecution})
    this.setState({passPercentageInLastExecution:DashboardData.PassPercentageInLastExecution})

    this.setState({ isPageLoading: false })

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

  //************************** ***************************************************************

  //****************** End */********************************** */

  render() {
    return (
      <Page
        className="dashboard"
        title="Dashboard"
      >
        {this.state.isPageLoading && <PageLoader sentences={LoaderMessage} height='100%' color="black" />}
        <Fade in={!this.state.isPageLoading}>
          <NotificationSystem ref={this.notificationSystem} />
          <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <TextWidget
                title="Total test cases"
                number={this.state.totalTestCase}
                color="black"
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <TextWidget
                title="Total defects"
                number={this.state.totalDefects}
                color="black"
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <TextWidget
                title="Total test plan"
                number={this.state.totalDefects}
                color="black"
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <NumberWidget
                title="Last Execution Results"
                number={this.state.totalTestCaseOnLastExecution}
                color="success"
                progress={{
                  value: this.state.passPercentageInLastExecution,
                  label: 'Pass',
                }}
              />
            </Col>
          </Row>
        </Fade>
      </Page>

    );
  }
}
export default DefectPage;
