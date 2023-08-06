import { ConfigData } from './ConfigData';
import { Config, Users } from '../../../QAautoMATER/Config';
import GetData from '../../../QAautoMATER/funcLib/getData';
import DataGeneratorUtility from '../../../QAautoMATER/funcLib/DataGeneratorUtility';
import FileLib from '../../../QAautoMATER/funcLib/fileLib';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';

const selectedProject = Config.SelectedProject;

export class ConfigGetter {

    async apiConfigPageLoadData() {

        var allconfigData = null;
        if (!Config.isDemo) {
            allconfigData = await this.readConfigurationFile();
            ConfigData.AllConfigData = await allconfigData;
        }
        await this.updateEnvironmentTableData(await allconfigData);
        await this.updateDefaultConfigurationData(await allconfigData);
        await this.updateUrlTableData(await allconfigData, ConfigData.DefaultSelectedEnvironment);
        await this.updateHttpHeaderTableData(await allconfigData);
        await this.updateAutherizationTableData(await allconfigData);
        await this.getAccountDetails();
        await this.renderAllComponent();
    }
    /////****** Default Configuration Getter *******************************************************

    async updateDefaultConfigurationData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.DefaultReportTrailCount = await DataGeneratorUtility.getNumberFromRange(40, 70);
            ConfigData.DefaultSaveDaysToReport = await DataGeneratorUtility.getNumberFromRange(20, 30);
            ConfigData.DefaultSaveDaysToDevelopment = await DataGeneratorUtility.getNumberFromRange(10, 30);
        }
        else {
            var dataChoice = await allconfigData['DefaultReportTrailCount'];
            if (dataChoice === undefined) {
                ConfigData.DefaultReportTrailCount = 0;
            }
            else {
                ConfigData.DefaultReportTrailCount = Number(await dataChoice);
            }
            dataChoice = await allconfigData['DefaultSaveDaysToReport'];
            if (dataChoice === undefined) {
                ConfigData.DefaultSaveDaysToReport = 0;
            }
            else {
                ConfigData.DefaultSaveDaysToReport = Number(await dataChoice);
            }
            dataChoice = await allconfigData['DefaultSaveDaysToDevelopment'];
            if (dataChoice === undefined) {
                ConfigData.DefaultSaveDaysToDevelopment = 0;
            }
            else {
                ConfigData.DefaultSaveDaysToDevelopment = Number(await dataChoice);
            }

        }
    }

    /////****** Configuration Getter ******************************************************************

    async updateEnvironmentTableData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.EnvNameList = [{ id: 1, name: 'Qa' }, { id: 2, name: 'Dev' }, { id: 3, name: 'Stg' }]
            ConfigData.EnvironmentList = ["QA", "Dev", "Stg"];
            ConfigData.DefaultSelectedEnvironment = "Dev";
            ConfigData.EnvNameForUrl = "Dev";
        }
        else {
            try {
                ConfigData.EnvNameList = await allconfigData['Environment'];
                if (await allconfigData['DefaultSelectedEnvironment'] === undefined || await allconfigData['DefaultSelectedEnvironment'] === '') {
                    try {
                        if (ConfigData.EnvNameList.length > 0) {
                            ConfigData.DefaultSelectedEnvironment = ConfigData.EnvironmentList[0];
                            ConfigData.EnvNameForUrl = ConfigData.EnvironmentList[0];
                            ConfigData.CleanUpEnvironment = ConfigData.EnvironmentList[0];
                        }
                    }
                    catch (error) { }
                }
                else {
                    ConfigData.DefaultSelectedEnvironment = await allconfigData['DefaultSelectedEnvironment'];
                    ConfigData.EnvNameForUrl = await allconfigData['DefaultSelectedEnvironment'];
                    ConfigData.CleanUpEnvironment = await allconfigData['DefaultSelectedEnvironment'];
                }
                if (ConfigData.EnvNameList.length > 0) {
                    ConfigData.EnvironmentList = await GetData.jsonArrayGetallKeyValue(ConfigData.EnvNameList, 'name');
                }
            }
            catch (error) { }
        }
    }

    /////****** Url Table Getter ******************************************************************

    async updateUrlTableData(allconfigData, environmentName) {
        if (Config.isDemo) {
            ConfigData.EnvUrlList = [{ "id": 1, "name": "baseUrl", "url": "https://fakerestapi.azurewebsites.net/api/v1/Activities" }]
        }
        else {
            var urlData = await allconfigData['Url'];
            if (urlData !== undefined) {
                var dataChoice = await environmentName;
                if (dataChoice !== undefined) {
                    var urlList = await urlData[dataChoice];
                    if (urlList !== undefined) {
                        ConfigData.EnvUrlList = await urlList;
                    }
                    else {
                        ConfigData.EnvUrlList = [];
                    }
                }
            }
            else {
                ConfigData.EnvUrlList = [];
            }
        }
    }

    /////****** Http header Table Getter ******************************************************************

    async updateHttpHeaderTableData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.HttpHeaderData = [{ id: 1, key: 'Accept', value: 'application/json' }, { id: 2, key: 'Content-Type', value: 'application/json' }];
        }
        else {
            var dataChoice = await allconfigData['HttpHeader'];
            if (dataChoice !== undefined && await dataChoice.length > 0) {
                ConfigData.HttpHeaderData = await dataChoice;
            }
            else {
                ConfigData.HttpHeaderData = [];
            }
        }
    }

    /////****** Update Autherization Table Header ******************************************************************

    async updateAutherizationTableData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.AutherizationTableData = [{ id: 1, key: 'baseApp', username: 'testUser', password: 'password' }];
        }
        else {
            var dataChoice = await allconfigData['Authorization'];
            if (dataChoice !== undefined) {
                ConfigData.AutherizationTableData = await dataChoice;
            }
            else {
                ConfigData.AutherizationTableData = [];
            }
        }
    }

    //**** Env Name List *********************************************************

    async updateRowIdAfterDelete(tableData, id) {
        tableData = await tableData.filter(m => m.id !== id);
        for (let i = 0; i < await tableData.length; i++) {
            tableData[i]['id'] = i + 1;;

        }
        return await tableData;
    }

    async readConfigurationFile(testingType = 'Api') {
        if (Config.fileSystemtechniques === 'local') {
            return await FileLib.readFile(selectedProject + '/' + testingType + '/Configuration.json');
        }
        else if (Config.fileSystemtechniques === 'api') {
            var backendAPI = await Config.backendAPI;
            if (Config.backendServiceAt === 'remote') {
                backendAPI = await Config.remoteBackendAPI;
            }
            if (await Users.userToken === null) {
                Users.userToken = await localStorage.getItem('Token');
            }
            if (await Users.userEmail === null) {
                Users.userEmail = await localStorage.getItem('UserEmail');
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(await backendAPI + 'configuration/project/' + await selectedProject + '/testingtype/' + await testingType, await headers);
            return await serverResponse['data'];
        }
    }

    async getAccountDetails() {
        if (Config.isDemo) {
            ConfigData.MaxReportCounter=30;
        }
        else {
          try {
            var backendAPI = await Config.backendAPI;
            if (Config.backendServiceAt === 'remote') {
              backendAPI = await Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendAPI + 'configuration/project/' + await selectedProject + '/accountdetails', await headers);
            var accountData = await serverResponse['data'];
            ConfigData.MaxReportCounter = await accountData['uiMaxReportTrailCount'];
          }
          catch (error) {
          }
        }
    }

    async renderAllComponent() {
        if (Config.isDemo) {
            ConfigData.ComponentList = ["All", "LandingPage", "SignIn", "ProductList", "ShoppingCart", "BookingSummary"];
            ConfigData.SelectedComponent = "All";
        }
        else {
          try {
            var backendAPI = await Config.backendAPI;
            if (Config.backendServiceAt === 'remote') {
              backendAPI = await Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendAPI + 'components/project/' + selectedProject + '/testingtype/Api', await headers);
            var allComponent = await serverResponse['data'];
            if (allComponent.length > 0) {
              ConfigData.SelectedComponent = await allComponent[0];
              ConfigData.ComponentList = await allComponent;
            }
          }
          catch (error) {
          }
        }
    }

    async deleteAPIComponent() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var testBody ={};
                testBody['component']= ConfigData.SelectedComponent;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + await selectedProject + '/testingtype/Api/deletecomponent', await headers, await testBody);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
                return false;
            }

        }

    }

    async renameAPIAutomationComponent() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var testBody ={};
                testBody['oldcomponent']= ConfigData.SelectedComponent;
                testBody['newcomponent']= ConfigData.NewComponentName;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + await selectedProject + '/testingtype/Api/renamecomponent', await headers, await testBody);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
                return false;
            }

        }

    }

    async getListOfTestCaseFromComponent(componentName) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return [{ value: 'QB-1', label: 'QB-1' }, { value: 'QB-2', label: 'QB-2' }];
        }
        else {
            var output = [];
            var listOfTestDetails =[];
            try {
                var backendAPI = await Config.backendAPI;
                if (await Config.backendServiceAt === 'remote') {
                    backendAPI = await Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.get(await backendAPI + 'components/' + await componentName + '/project/' + await selectedProject + '/testingtype/Api', await headers);
                output = await serverResponse['data'];
                for(let i=0;i<await output.length;i++)
                {
                   var onebyoneValue ={ value: '', label: '' };
                   onebyoneValue.value = await output[i]['testid']+'@'+await output[i]['testname'];
                   onebyoneValue.label = await output[i]['testid']+'@'+await output[i]['testname'];
                   listOfTestDetails.push(await onebyoneValue);

                }

    
            } catch (error) {
            }
            return await listOfTestDetails;

        }

    }

}
export default new ConfigGetter();

