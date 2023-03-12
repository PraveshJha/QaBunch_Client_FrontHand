import Page from '../../Page';
import React from 'react';
import {
  Col,
  Row,
  Fade,
  Card,
  CardHeader,
  Input,
  CardBody,
} from 'reactstrap';
import { TextWidget, NumberWidget } from '../../../uiLayout/components/widget';
import { DashboardData } from './DashboardData'
import DashboardGetter from './DashboardGetter';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import NotificationSystem from 'react-notification-system';
import "react-widgets/styles.css";
import PageLoader from 'react-fullpage-custom-loader'
import { LoaderMessage } from '../../LoaderMessage';
import "react-widgets/styles.css";
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import 'react-quill/dist/quill.snow.css';
import DropDownOptions from '../../../uiLayout/components/DropDownOptions'
import { DoughnutChart, BarChart, LineChart } from '../../../uiLayout/components/chart'
import DataGeneratorUtility from '../../../QAautoMATER/funcLib/DataGeneratorUtility';


class DefectPage extends React.Component {
  notificationSystem = React.createRef();
  constructor(props) {
    super(props);
    this.state = {

      //****** Page Loader ***********************************************************
      isPageLoading: false,

      //****** Test Cycle***********************************************************
      listOfTestCycle: DashboardData.ListOfTestCycle,
      selectedTestCycle: DashboardData.SelectedTestCycle,

      //************Widget Data*******************************************************
      totalTestCase: DashboardData.TotalTestCase,
      totalDefects: DashboardData.TotalDefects,
      totalTestPlan: DashboardData.TotalTestPlan,
      totalTestCaseOnLastExecution: DashboardData.TotalTestCaseOnLastExecution,
      passPercentageInLastExecution: DashboardData.PassPercentageInLastExecution,

      //************Dought Data*******************************************************
      automatedandNotAutomatedData:DashboardData.AutomatedandNotAutomatedData,
      colorCodeForAutomatedGraph:DashboardData.ColorCodeForAutomatedGraph,
      testPriorityDataXaxis:DashboardData.TestPriorityDataXaxis,
      testPriorityDataYaxis:DashboardData.TestPriorityDataYaxis,
      colorCodeForTestPriority:DashboardData.ColorCodeForTestPriority,
      componentTestCaseCountXaxisData:DashboardData.ComponentTestCaseCountXaxisData,
      componentTestCaseCountYaxisData:DashboardData.ComponentTestCaseCountYaxisData,
      colorCodeForComponentTestCaseCount:DashboardData.ColorCodeForComponentTestCaseCount

    };

  }
  componentDidMount = async () => {
    await window.scrollTo(0, 0);
    this.setState({ isPageLoading: true })
    await DashboardGetter.loadDashboardPage();

    //************Test Cycle*******************************************************
    this.setState({ listOfTestCycle: DashboardData.ListOfTestCycle })
    this.setState({ selectedTestCycle: DashboardData.SelectedTestCycle })

    //************Widget Data*******************************************************
    this.setState({ totalTestCase: DashboardData.TotalTestCase })
    this.setState({ totalDefects: DashboardData.TotalDefects })
    this.setState({ totalTestPlan: DashboardData.TotalTestPlan })
    this.setState({ totalTestCaseOnLastExecution: DashboardData.TotalTestCaseOnLastExecution })
    this.setState({ passPercentageInLastExecution: DashboardData.PassPercentageInLastExecution })

    //************Dought Data*******************************************************
    this.setState({ automatedandNotAutomatedData: DashboardData.AutomatedandNotAutomatedData })
    DashboardData.ColorCodeForAutomatedGraph = await DataGeneratorUtility.gerHexaColorCodeForArray(3);
    this.setState({ colorCodeForAutomatedGraph: DashboardData.ColorCodeForAutomatedGraph })
    this.setState({ testPriorityDataXaxis: DashboardData.TestPriorityDataXaxis })
    this.setState({ testPriorityDataYaxis: DashboardData.TestPriorityDataYaxis })
    DashboardData.ColorCodeForTestPriority = await DataGeneratorUtility.gerHexaColorCodeForArray(DashboardData.TestPriorityDataXaxis.length);
    this.setState({ colorCodeForTestPriority: DashboardData.ColorCodeForTestPriority })
    this.setState({ componentTestCaseCountXaxisData: DashboardData.ComponentTestCaseCountXaxisData })
    this.setState({ componentTestCaseCountYaxisData: DashboardData.ComponentTestCaseCountYaxisData })
    DashboardData.ColorCodeForComponentTestCaseCount = await DataGeneratorUtility.gerHexaColorCodeForArray(DashboardData.ComponentTestCaseCountXaxisData.length);
    this.setState({ colorCodeForComponentTestCaseCount: DashboardData.ColorCodeForComponentTestCaseCount })

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

  //************************** Test Cycle ***************************************************************

  selectTestCycle = async (event) => {
    var dataChoice = await event.target.value;
    if (await this.state.selectedTestCycle !== await dataChoice) {
      DashboardData.SelectedTestCycle = await dataChoice;
      this.setState({ selectedTestCycle: await dataChoice });
    }
  };

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
            <Col lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex justify-content-between align-items-center">
                    Select Test Cycle
                    <div className="d-flex justify-content-between align-items-center">
                      <Col>
                        <Input type="select" name="placeHolder" value={this.state.selectedTestCycle} onChange={this.selectTestCycle.bind(this)}>
                          <DropDownOptions options={this.state.listOfTestCycle} />
                        </Input>
                      </Col>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
          </Row>
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
                number={this.state.totalTestPlan}
                color="black"
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <NumberWidget
                title="Last Execution Results"
                number={this.state.totalTestCaseOnLastExecution}
                color="success"
                progress={
                  {
                    value: this.state.passPercentageInLastExecution,
                    label: 'Pass',
                  }
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>Test Case Automation Type
                </CardHeader>
                <CardBody>
                  <Col>
                    <DoughnutChart color={this.state.colorCodeForAutomatedGraph} labels={['Automated', 'Not Automated','Not a right candidate']} data={this.state.automatedandNotAutomatedData}></DoughnutChart>
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>Test case count based on Priority
                </CardHeader>
                <CardBody>
                  <Col>
                    <DoughnutChart color={this.state.colorCodeForTestPriority} labels={this.state.testPriorityDataXaxis} data={this.state.testPriorityDataYaxis}></DoughnutChart>
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>Component
                  <small> Script count</small>
                </CardHeader>
                <CardBody>
                  <Col>
                    <BarChart labels={this.state.componentTestCaseCountXaxisData} data={this.state.componentTestCaseCountYaxisData} color={this.state.colorCodeForComponentTestCaseCount}></BarChart>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col lg={3} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>Defect Count based on Priority
                </CardHeader>
                <CardBody>
                  <Col>
                    <DoughnutChart color={this.state.colorCodeForAutomatedGraph} labels={['Automated', 'Not Automated','Not a right candidate']} data={this.state.automatedandNotAutomatedData}></DoughnutChart>
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>Defect Count based on Status
                </CardHeader>
                <CardBody>
                  <Col>
                    <DoughnutChart color={this.state.colorCodeForTestPriority} labels={this.state.testPriorityDataXaxis} data={this.state.testPriorityDataYaxis}></DoughnutChart>
                  </Col>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} md={6} sm={6} xs={12}>
              <Card>
                <CardHeader>Component
                  <small> Defect count</small>
                </CardHeader>
                <CardBody>
                  <Col>
                    <BarChart labels={this.state.componentTestCaseCountXaxisData} data={this.state.componentTestCaseCountYaxisData} color={this.state.colorCodeForComponentTestCaseCount}></BarChart>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
        </Fade>
      </Page>

    );
  }
}
export default DefectPage;
