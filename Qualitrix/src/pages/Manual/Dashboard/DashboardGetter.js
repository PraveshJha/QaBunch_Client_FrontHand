import { DashboardData } from './DashboardData';
import { Config, Users } from '../../../QAautoMATER/Config';
import ConfigGetter from '../Configuration/ConfigGetter';
import { ConfigData } from '../Configuration/ConfigData';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import  GetData  from '../../../QAautoMATER/funcLib/getData';
const selectedProject = Config.SelectedProject;

export class DashboardGetter {

    async loadDashboardPage() {

        await ConfigGetter.manualConfigPageLoad();
        DashboardData.ListOfTestCycle = await ConfigData.ListOfTestCycle;
        DashboardData.SelectedTestCycle = await ConfigData.CurrentTestCycle;
        var dashboardData= await this.getDashBoardData(DashboardData.SelectedTestCycle);
    }

    async getDashBoardData(testCycleName)
    {
        if(await Config.isDemo)
        {

        }
        else{
            if(await testCycleName === '' || await testCycleName === undefined)
            {
                return;
            }
            try {
                var testBody = {}
                testBody['testCycle'] = await testCycleName;
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(await backendApi + 'manualdashboard/project/' + await selectedProject + '/getdashboarddata', await headers, await testBody);
                var allDashBoardData = await serverResponse['data'];
                DashboardData.TotalTestCase = await allDashBoardData['totaltestcase'];
                DashboardData.TotalDefects = await allDashBoardData['totaldefect'];
                DashboardData.TotalTestPlan = await allDashBoardData['totaltestplan'];
                DashboardData.TotalTestCaseOnLastExecution = await allDashBoardData['totaltestcaseonlastexecution'];
                DashboardData.PassPercentageInLastExecution = await allDashBoardData['passpercentageinlastexecution'];
                DashboardData.AutomatedandNotAutomatedData = await allDashBoardData['automatedgraphdata'];
                var testPriorityData  = await GetData.getAllKeyValueInJsonArrayFromJsonObject(await allDashBoardData['testprioritydata']);
                DashboardData.TestPriorityDataXaxis = await testPriorityData['key']
                DashboardData.TestPriorityDataYaxis = await testPriorityData['value']
                var componentTestCaseData  = await GetData.getAllKeyValueInJsonArrayFromJsonObject(await allDashBoardData['componenttestcasedata']);
                DashboardData.ComponentTestCaseCountXaxisData =[];
                DashboardData.ComponentTestCaseCountYaxisData =[]
                DashboardData.ComponentTestCaseCountXaxisData= await componentTestCaseData['key'];
                DashboardData.ComponentTestCaseCountYaxisData.push(await componentTestCaseData['value']);
                return await allDashBoardData;
            }
            catch (error) {
                DashboardData.TotalTestCase = 0;
                DashboardData.TotalDefects = 0;
                DashboardData.TotalTestPlan = 0;
                DashboardData.TotalTestCaseOnLastExecution = 0;
                DashboardData.PassPercentageInLastExecution = 0;
                DashboardData.AutomatedandNotAutomatedData =[]
                DashboardData.TestPriorityDataXaxis =[];
                DashboardData.TestPriorityDataYaxis =[];
                DashboardData.ComponentTestCaseCountXaxisData = []
                DashboardData.ComponentTestCaseCountYaxisData = []
            }
        }
    }

}
export default new DashboardGetter();

