import { ConfigData } from './ConfigData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import FileLib from '../../../QAautoMATER/funcLib/fileLib';
import GetData from '../../../QAautoMATER/funcLib/getData';


export class ConfigGetter {

    async mobileConfigPageLoadData() {
        var allconfigData = {};
        if (!Config.isDemo) {
            allconfigData = await this.readConfigurationFile('Mobile');
            ConfigData.AllConfigData = await allconfigData;
        }
        // Set Default Config Value
        await this.setDefaultConfigurationValue(await allconfigData)
        // Set Mobile App details
        await this.setMobileAppDetails(await allconfigData);
        // Set Device Details Data
        await this.setEmulatorDetails(await allconfigData);
        //Set Test Managment Details Data
        await this.setTestManagmentDetails(await allconfigData);
        //Set Capability section
        await this.setCapabilityDetails();
        //CleanUpDetails
        await this.setCleanUpDetails();
        // get all Component
        await this.renderAllComponent();
        //Get all Locator
        await this.getLocatorData(await allconfigData);

        // get all Tag
        await this.setLocator();

    }

    async saveDefaultConfiguration() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            const selectedProject = await localStorage.getItem('UserSelectedAccount')
            var defaultConfigData = {};
            defaultConfigData["DefaultSelectedEnvironment"] = ConfigData.DefaultSelectedEnvironment;
            defaultConfigData["DefaultReportTrailCount"] = ConfigData.DefaultReportTrailCount;
            defaultConfigData["DefaultSaveDaysToReport"] = ConfigData.DefaultSaveDaysToReport;
            defaultConfigData["DefaultSaveDaysToDevelopment"] = ConfigData.DefaultSaveDaysToDevelopment;
            defaultConfigData["DefaultScreenshotOption"] = ConfigData.SelectedScreenshot;
            defaultConfigData["DefaultExecutionPlatform"] = ConfigData.DefaultExecutionPlatform;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/defaultconfiguration', await headers, await defaultConfigData);
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

    async updateRowIdAfterDelete(tableData, id) {
        tableData = await tableData.filter(m => m.id !== id);
        for (let i = 0; i < await tableData.length; i++) {
            tableData[i]['id'] = i + 1;;

        }
        return await tableData;
    }

    async saveURLDetails() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            const selectedProject = await localStorage.getItem('UserSelectedAccount')
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/envlist', await headers, await ConfigData.EnvUrlList);
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

    async readConfigurationFile(testingType = 'Mobile') {
        var selectedProject = await localStorage.getItem('UserSelectedAccount');
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

    async setDefaultConfigurationValue(allConfigData) {
        try {
            var envList = await allConfigData['Environment'];
            if(await envList ===undefined)
            {
                envList =[];
            }
            if (await envList.length > 0) {
                var allEnvKey = await GetData.jsonArrayGetallKeyValue(await envList, 'name');
                ConfigData.EnvironmentList = await allEnvKey;
                var DefaultSelectedEnvironment = await allConfigData['DefaultSelectedEnvironment'];
                if (await DefaultSelectedEnvironment === undefined) {
                    ConfigData.DefaultSelectedEnvironment = await allEnvKey[0];
                }
                else {
                    ConfigData.DefaultSelectedEnvironment = await DefaultSelectedEnvironment;
                }
            }
            else {
                ConfigData.EnvUrlList = [];
                ConfigData.DefaultSelectedEnvironment = '';
            }
            var dataChoice = await allConfigData['DefaultReportTrailCount'];
            if (await dataChoice === undefined) {
                ConfigData.DefaultReportTrailCount = 0;
            }
            else {
                ConfigData.DefaultReportTrailCount = Number(await dataChoice);
            }
            dataChoice = await allConfigData['DefaultSaveDaysToReport'];
            if (await dataChoice === undefined) {
                ConfigData.DefaultSaveDaysToReport = 0;
            }
            else {
                ConfigData.DefaultSaveDaysToReport = Number(await dataChoice);
            }
            dataChoice = await allConfigData['DefaultSaveDaysToDevelopment'];
            if (await dataChoice === undefined) {
                ConfigData.DefaultSaveDaysToDevelopment = 0;
            }
            else {
                ConfigData.DefaultSaveDaysToDevelopment = Number(await dataChoice);
            }
            dataChoice = await allConfigData['DefaultScreenshotOption'];
            if (await dataChoice === undefined) {
                ConfigData.DefaultScreenshotOption = 'For failure & success';
            }
            else {
                ConfigData.DefaultScreenshotOption = await dataChoice;
            }
            dataChoice = await allConfigData['DefaultExecutionPlatform'];
            if (await dataChoice === undefined) {
                ConfigData.DefaultExecutionPlatform = 'Android';
            }
            else {
                ConfigData.DefaultExecutionPlatform = await dataChoice;
            }
        }
        catch (error) { }
    }
    async setMobileAppDetails(allConfigData) {
        try {
            var envList = await allConfigData['Environment'];
            if(await envList !==undefined)
            {
                ConfigData.EnvUrlList = await envList;
            }
            else{
                ConfigData.EnvUrlList = [];
            }
        }
        catch (error) { }
    }

    async saveEmulatorData() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/emulator', await headers, await ConfigData.AllEmulatorTableData);
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

    async setEmulatorDetails(allConfigData) {
        try {
            var deviceDetails = await allConfigData['Emulator'];
            if(await deviceDetails !==undefined)
            {
                ConfigData.AllEmulatorTableData = await deviceDetails;
            }
            else{
                ConfigData.AllEmulatorTableData = [];
            }
        }
        catch (error) { }
    }

    async saveToolsData() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/testingtools', await headers, await ConfigData.AllTestManagementToolData);
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

    async setTestManagmentDetails(allConfigData) {
        try {
            var testToolData = await allConfigData['Tools'];
            if(await testToolData !==undefined)
            {
                ConfigData.AllTestManagementToolData = await testToolData;
            }
            else{
                ConfigData.AllTestManagementToolData = [];
            }
        }
        catch (error) { }
    }

    async saveCapabilityDataOnServer() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var capData = {};
            capData["HubUrl"] = ConfigData.ServerUrl;
            capData["Capabilities"] = ConfigData.AllCapabilities;
            var capFor = ConfigData.ExecutionServer;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/capability/' + capFor, await headers, await await capData);
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

    async setAllCapability(capFor)
    {
      var mobileCaps = await ConfigData.AllConfigData['ExecutionCapabilities'];
      if(await mobileCaps === undefined)
      {
        mobileCaps={};
      }
      var allCapsforAllPlatform = await mobileCaps[await capFor];
      if(allCapsforAllPlatform ===undefined)
      {
        var caps = [{
            "platformName": "Android",
            "platformVersion": "",
            "deviceName": "",
            "automationName": "UiAutomator2"
          }]
        ConfigData.AllCapabilities = await caps;
        ConfigData.ServerUrl='';
      }
      else{
        ConfigData.ServerUrl = await allCapsforAllPlatform['HubUrl'];
        ConfigData.AllCapabilities = await allCapsforAllPlatform['Capabilities'];
      }
    
    }

    async setCapabilityDetails() {
        try {
            var allServer = ConfigData.AllExecutionServer;
            if(allServer.length ===0)
            {
                ConfigData.ExecutionServer='';
                ConfigData.ServerUrl =''
                ConfigData.AllCapabilities =[];
            }
            else{
                ConfigData.ExecutionServer = await allServer[0];
                await this.setAllCapability(await ConfigData.ExecutionServer);
            }
        }
        catch (error) { }
    }

    async deleteReportData(envName, daysToDelete) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var reportData = {};
            reportData["envName"] = await envName;
            reportData["days"] = await daysToDelete;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'cleanup/project/' + selectedProject + '/testingtype/Mobile', await headers, await reportData);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isSuccess'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
                return false;
            }
        }

    }

    async setCleanUpDetails() {
        try {
            ConfigData.CleanUpEnvironment = ConfigData.DefaultSelectedEnvironment;
        }
        catch (error) { }
    }

    async renderAllComponent() {
        if (Config.isDemo) {
            ConfigData.ComponentList = ["All", "LandingPage", "SignIn", "ProductList", "ShoppingCart", "BookingSummary"];
            ConfigData.SelectedComponent = "All";
        }
        else {
          try {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var backendAPI = await Config.backendAPI;
            if (Config.backendServiceAt === 'remote') {
              backendAPI = await Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendAPI + 'components/project/' + selectedProject + '/testingtype/Mobile', await headers);
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

    async deleteAutomationComponent() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var testBody ={};
                testBody['component']= ConfigData.SelectedComponent;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + await selectedProject + '/testingtype/Mobile/deletecomponent', await headers, await testBody);
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

    async renameAutomationComponent() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
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
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + await selectedProject + '/testingtype/Mobile/renamecomponent', await headers, await testBody);
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

    async moveYourTestScripts() {
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
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var testBody ={};
                testBody['sourceComponent'] = ConfigData.SelectedSourceComponentToMove;
                testBody['destinationComponent'] = ConfigData.SelectedDestinationComponentToMove;
                testBody['listOfTestId'] = ConfigData.ListOfTestIdToMove;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/movetestscripts', await headers, await testBody);
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
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var backendAPI = await Config.backendAPI;
                if (await Config.backendServiceAt === 'remote') {
                    backendAPI = await Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.get(await backendAPI + 'components/' + await componentName + '/project/' + await selectedProject + '/testingtype/Mobile', await headers);
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

    async saveLocatorData(allocatorData) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/savelocatordata', await headers, {'alllocator':await allocatorData});
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

    async getLocatorData(allConfigData)
    {
        if (Config.isDemo) {
            ConfigData.AllElementLocator=[{"id":1,"locator":"id"},{"id":2,"locator":"xpath"},{"id":3,"locator":"class"},{"id":4,"locator":"text"},{"id":5,"locator":"resource-id"}]
        }
        else {
          try {
            var allLocator = await allConfigData['Locator'];
            if(await allLocator ===undefined)
            {
                ConfigData.AllElementLocator=[{"id":1,"locator":"id"},{"id":2,"locator":"xpath"},{"id":3,"locator":"class"},{"id":4,"locator":"text"},{"id":5,"locator":"resource-id"}]
            }
            else{
                var locatorData =[];
                for(let i=0;i<await allLocator.length;i++)
                {
                    var onebyoneData ={};
                    var id = Number(i+1);
                    var name = await allLocator[i].toString().trim();
                    onebyoneData['id'] = await id;
                    onebyoneData['locator'] = await name;
                    locatorData.push(await onebyoneData);
                }
                ConfigData.AllElementLocator = await locatorData;
            }
          }
          catch (error) {
          }
        }
    }

    async saveORTagData() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                const selectedProject = await  localStorage.getItem('UserSelectedAccount')
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var dataforSend = {};
                dataforSend['elementtag'] = await ConfigData.ORTagDataToSave;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Mobile/updatetag', await headers, await dataforSend);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }
    }

    async  setLocator()
    {
        //*** Set OR Tag Data */
        var elementKeyData = await ConfigData.AllConfigData['ELEMENTTAGDATA'];
        if(elementKeyData ===undefined)
        {
            elementKeyData ={};
            elementKeyData['BUTTON'] ={}
            elementKeyData['BUTTON']['TAG']='//android.widget.Button'
            elementKeyData['BUTTON']['IOSTAG']='//*'
            elementKeyData['TEXTBOX'] ={}
            elementKeyData['TEXTBOX']['TAG']='//android.widget.TextView'
            elementKeyData['TEXTBOX']['IOSTAG']='//*'
            elementKeyData['LINK'] ={};
            elementKeyData['LINK']['TAG'] ="//android.widget.Button";
            elementKeyData['LINK']['IOSTAG'] ="//*";
            elementKeyData['IMAGE'] ={};
            elementKeyData['IMAGE']['TAG'] ="//android.widget.Image";
            elementKeyData['IMAGE']['IOSTAG'] ="//*";
            elementKeyData['CHECKBOX'] ={};
            elementKeyData['CHECKBOX']['TAG'] ="//android.widget.TextView";
            elementKeyData['CHECKBOX']['IOSTAG'] ="//*";
            elementKeyData['RADIOBUTTON'] ={};
            elementKeyData['RADIOBUTTON']['TAG'] ="//android.widget.TextView";
            elementKeyData['RADIOBUTTON']['IOSTAG'] ="//*";
            elementKeyData['LISTBOX'] ={};
            elementKeyData['LISTBOX']['TAG'] ="//android.widget.Select";
            elementKeyData['LISTBOX']['IOSTAG'] ="//*";
            elementKeyData['TEXTAREA'] ={};
            elementKeyData['TEXTAREA']['TAG'] ="//android.widget.TextArea";
            elementKeyData['TEXTAREA']['IOSTAG'] ="//*";
            elementKeyData['LABEL'] ={};
            elementKeyData['LABEL']['TAG'] ="//android.view.View";
            elementKeyData['LABEL']['IOSTAG'] ="//*";
            elementKeyData['DEFAULT'] ={};
            elementKeyData['DEFAULT']['TAG']  ="//*";
            elementKeyData['DEFAULT']['IOSTAG']  ="//*";
        }
        var allTagData = [];
        var tagData = await Object.keys(await elementKeyData);
        for (let i = 0; i < await tagData.length; i++) {
            var eleName = await tagData[i];
            var allDetails = { id: i + 1, type: eleName, tag: await elementKeyData[await eleName]['TAG'],iostag:await  elementKeyData[await eleName]['IOSTAG'] };
            allTagData.push(await allDetails);
        }
        ConfigData.ORElementTagData = await allTagData;
    }


}
export default new ConfigGetter();

