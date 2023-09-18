import { ConfigData } from './ConfigData';
import { Config, Users } from '../../../QAautoMATER/Config';
import GetData from '../../../QAautoMATER/funcLib/getData';
import DataGeneratorUtility from '../../../QAautoMATER/funcLib/DataGeneratorUtility';
import FileLib from '../../../QAautoMATER/funcLib/fileLib';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';

export class ConfigGetter {

    async uiConfigPageLoadData() {

        var allconfigData = null;
        if (!await Config.isDemo) {
            allconfigData = await this.readConfigurationFile('Web');
            ConfigData.AllConfigData = await allconfigData;
        }
        await this.updateEnvironmentTableData(await allconfigData);
        await this.updateDefaultConfigurationData(await allconfigData);
        await this.updateEmulatorTableData(await allconfigData);
        await this.updateDefaultScreen(await allconfigData);
        await this.updateToolsTableData(await allconfigData);
        await this.setAllCapability(ConfigData.ExecutionServer);
        await this.renderAllComponent();
        await this.getAccountDetails();
        await this.getLocatorData(await allconfigData)
        await this.setTagData(await allconfigData);

    }
    /////****** Default Configuration Getter *******************************************************

    async updateDefaultConfigurationData(allconfigData) {
        var dataChoice = ''
        if (Config.isDemo) {
            ConfigData.EnvironmentList = await ['Dev', 'QA'];
            ConfigData.DefaultSelectedEnvironment = 'Dev';
            ConfigData.DefaultReportTrailCount = await DataGeneratorUtility.getNumberFromRange(40, 70);
            ConfigData.DefaultSaveDaysToReport = await DataGeneratorUtility.getNumberFromRange(20, 30);
            ConfigData.DefaultSaveDaysToDevelopment = await DataGeneratorUtility.getNumberFromRange(10, 30);
        }
        else {
            if (ConfigData.EnvUrlList.length > 0) {
                ConfigData.EnvironmentList = await GetData.jsonArrayGetallKeyValue(await ConfigData.EnvUrlList, 'name');
                dataChoice = await allconfigData['DefaultSelectedEnvironment'];
                if (dataChoice === undefined) {
                    ConfigData.DefaultSelectedEnvironment = ConfigData.EnvironmentList[0];
                    ConfigData.CleanUpEnvironment = await ConfigData.EnvironmentList[0];
                }
                else {
                    ConfigData.DefaultSelectedEnvironment = await dataChoice;
                    ConfigData.CleanUpEnvironment = await dataChoice;
                }
            }
            dataChoice = await allconfigData['DefaultReportTrailCount'];
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
            dataChoice = await allconfigData['DefaultScreenshotOption'];
            if (dataChoice === undefined) {
                ConfigData.SelectedScreenshot = 'For failure & success';
            }
            else {
                ConfigData.SelectedScreenshot = await dataChoice
            }

        }
    }

    /////****** Configuration Getter ******************************************************************

    async updateEnvironmentTableData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.EnvUrlList = [{ id: 1, name: 'QA', url: 'https://www.google.com/' }, { id: 2, name: 'Dev', url: 'https://www.selenium.dev/' }]
        }
        else {
            if (await allconfigData['Environment'] === undefined) {
                ConfigData.EnvUrlList = [];
            }
            else {
                ConfigData.EnvUrlList = await allconfigData['Environment'];
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
        var selectedProject = await localStorage.getItem('UserSelectedAccount');
        if (Config.fileSystemtechniques === 'local') {
            return await FileLib.readFile(selectedProject + '/' + testingType + '/Configuration.json');
        }
        else if (await Config.fileSystemtechniques === 'api') {
            var backendAPI = await Config.backendAPI;
            if (Config.backendServiceAt === 'remote') {
                backendAPI = await Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendAPI + 'configuration/project/' + selectedProject + '/testingtype/' + testingType, await headers);
            return await serverResponse['data'];
        }
    }

    async updateEmulatorTableData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.AllEmulatorTableData = [{ id: 1, device: 'Mobile', name: 'iPhone 12 Pro', width: '390', height: '944' }, { id: 2, device: 'Tablet', name: 'iPad Air', width: '820', height: '1180' }]
            ConfigData.AllMobileEmulator = ['iPhone 12 Pro', 'Pixel 5'];
            ConfigData.AllTabletEmulator = ['iPad Air', 'iPad Mini'];
        }
        else {
            if (await allconfigData['Emulator'] === undefined) {
                ConfigData.AllEmulatorTableData = [];
                ConfigData.AllMobileEmulator = [];
                ConfigData.AllTabletEmulator = [];
            }
            else {
                var allMobileDevice = [];
                var allTabletDevice = [];
                ConfigData.AllEmulatorTableData = await allconfigData['Emulator'];
                // Set Mobile and Tablet Data
                for (let i = 0; i < await ConfigData.AllEmulatorTableData.length; i++) {
                    var deviceType = await ConfigData.AllEmulatorTableData[i]['device'];
                    switch (deviceType.toString()) {
                        case "Mobile":
                            allMobileDevice.push(await ConfigData.AllEmulatorTableData[i]['name']);
                            break;
                        case "Tablet":
                            allTabletDevice.push(await ConfigData.AllEmulatorTableData[i]['name']);
                            break;
                        default:
                            break;
                    }
                }
                ConfigData.AllMobileEmulator = await allMobileDevice;
                ConfigData.AllTabletEmulator = await allTabletDevice;
            }
        }
    }

    async updateDefaultScreen(allconfigData) {
        if (Config.isDemo) {
            ConfigData.DefaultExecutionPlatform = 'Desktop';
            ConfigData.DefaultBrowser = 'Chrome';
            ConfigData.DefaultMobileEmulator = 'iPhone 12 Pro';
            ConfigData.DefaultTabletEmulator = 'iPad Air';
        }
        else {
            var platform = await allconfigData['DefaultExecutionPlatform'];
            if (platform === undefined) {
                if (ConfigData.AllExecutionPlatform.length > 0) {
                    ConfigData.DefaultExecutionPlatform = await ConfigData.AllExecutionPlatform[0];
                }
            }
            else {
                ConfigData.DefaultExecutionPlatform = await platform;
            }
            var browser = await allconfigData['DefaultBrowser'];
            if (browser === undefined) {
                if (ConfigData.AllBrowserList.length > 0) {
                    ConfigData.DefaultBrowser = await ConfigData.AllBrowserList[0];
                }
            }
            else {
                ConfigData.DefaultBrowser = await browser;
            }
            var mobileDevice = await allconfigData['DefaultMobileEmulator'];
            if (mobileDevice === undefined) {
                if (ConfigData.AllMobileEmulator.length > 0) {
                    ConfigData.DefaultMobileEmulator = await ConfigData.AllMobileEmulator[0];
                }
            }
            else {
                if (ConfigData.AllMobileEmulator.length > 0) {
                    ConfigData.DefaultMobileEmulator = await mobileDevice;
                }

            }
            var tabletDevice = await allconfigData['DefaultTabletEmulator'];
            if (tabletDevice === undefined) {
                if (ConfigData.AllTabletEmulator.length > 0) {
                    ConfigData.DefaultTabletEmulator = await ConfigData.AllTabletEmulator[0];
                }
            }
            else {
                if (ConfigData.AllTabletEmulator.length > 0) {
                    ConfigData.DefaultTabletEmulator = await tabletDevice;
                }

            }
        }

    }

    async updateToolsTableData(allconfigData) {
        if (Config.isDemo) {
            ConfigData.AllTestManagementToolData = [{ id: 1, tool: 'Jira', url: 'https://jira.qaautomater.com', username: 'QAautoMATER', password: 'iampasswordKey' }]
        }
        else {
            var toolsData = await allconfigData['Tools'];
            if (toolsData === undefined) {
                ConfigData.AllTestManagementToolData = []
            }
            else {
                ConfigData.AllTestManagementToolData = await toolsData;
            }
        }
    }

    async isValidUrl(urlString) {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    async setAllCapability(capFor) {
        var allCaps = await ConfigData.AllConfigData['ExecutionCapabilities'];
        if (await allCaps === undefined) {
            ConfigData.AllConfigData['ExecutionCapabilities'] = {}
        }
        var allCapsforAllPlatform = await ConfigData.AllConfigData['ExecutionCapabilities'][await capFor];
        if (allCapsforAllPlatform === undefined) {
            var baseCapabilitys = await ConfigData.AllCapabilities;
            baseCapabilitys['Desktop']['Chrome'] = await ConfigData.CommonCapability;
            baseCapabilitys['Desktop']['Firefox'] = await ConfigData.CommonCapability;
            baseCapabilitys['Desktop']['Edge'] = await ConfigData.CommonCapability;
            baseCapabilitys['Desktop']['Safari'] = await ConfigData.CommonCapability;
            baseCapabilitys['Mobile'] = await ConfigData.CommonCapability;
            baseCapabilitys['Tablet'] = await ConfigData.CommonCapability;
            ConfigData.AllCapabilities = await baseCapabilitys;
            ConfigData.ServerUrl = '';
        }
        else {
            ConfigData.ServerUrl = await allCapsforAllPlatform['HubUrl'];
            ConfigData.AllCapabilities = await allCapsforAllPlatform['Capabilities'];
        }

    }

    async renderAllComponent() {
        if (Config.isDemo) {
            ConfigData.ComponentList = ["All", "LandingPage", "SignIn", "ProductList", "ShoppingCart", "BookingSummary"];
            ConfigData.SelectedComponent = "All";
        }
        else {
            try {
                var selectedProject = await localStorage.getItem('UserSelectedAccount');
                var backendAPI = await Config.backendAPI;
                if (Config.backendServiceAt === 'remote') {
                    backendAPI = await Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.get(backendAPI + 'components/project/' + selectedProject + '/testingtype/Web', await headers);
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
            var selectedProject = await localStorage.getItem('UserSelectedAccount');
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var testBody = {};
                testBody['component'] = ConfigData.SelectedComponent;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + await selectedProject + '/testingtype/Web/deletecomponent', await headers, await testBody);
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

    async getAccountDetails() {
        if (Config.isDemo) {
            ConfigData.MaxReportCounter = 30;
        }
        else {
            try {
                var selectedProject = await localStorage.getItem('UserSelectedAccount');
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

    async getLocatorData(allConfigData) {
        if (Config.isDemo) {
            ConfigData.AllElementLocator = [{ "id": 1, "locator": "id" }, { "id": 2, "locator": "name" }, { "id": 3, "locator": "xpath" }, { "id": 4, "locator": "linktext" }, { "id": 5, "locator": "partiallinktext" }, { "id": 6, "locator": "class" }, { "id": 7, "locator": "cssselector" }]
        }
        else {
            try {
                var allLocator = await allConfigData['Locator'];
                if (await allLocator === undefined) {
                    ConfigData.AllElementLocator = [{ "id": 1, "locator": "id" }, { "id": 2, "locator": "name" }, { "id": 3, "locator": "xpath" }, { "id": 4, "locator": "linktext" }, { "id": 5, "locator": "partiallinktext" }, { "id": 6, "locator": "class" }, { "id": 7, "locator": "cssselector" }]
                }
                else {
                    var locatorData = [];
                    for (let i = 0; i < await allLocator.length; i++) {
                        var onebyoneData = {};
                        var id = Number(i + 1);
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

    async renameAutomationComponent() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            var selectedProject = await localStorage.getItem('UserSelectedAccount');
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var testBody = {};
                testBody['oldcomponent'] = ConfigData.SelectedComponent;
                testBody['newcomponent'] = ConfigData.NewComponentName;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + await selectedProject + '/testingtype/Web/renamecomponent', await headers, await testBody);
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

    async saveORTagData() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await localStorage.getItem('UserSelectedAccount');
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var dataforSend = {};
                dataforSend['elementtag'] = await ConfigData.ORTagDataToSave;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Web/updatetag', await headers, await dataforSend);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
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
            var listOfTestDetails = [];
            try {
                var selectedProject = await localStorage.getItem('UserSelectedAccount');
                var backendAPI = await Config.backendAPI;
                if (await Config.backendServiceAt === 'remote') {
                    backendAPI = await Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.get(await backendAPI + 'components/' + await componentName + '/project/' + await selectedProject + '/testingtype/Web', await headers);
                output = await serverResponse['data'];
                for (let i = 0; i < await output.length; i++) {
                    var onebyoneValue = { value: '', label: '' };
                    onebyoneValue.value = await output[i]['testid'] + '@' + await output[i]['testname'];
                    onebyoneValue.label = await output[i]['testid'] + '@' + await output[i]['testname'];
                    listOfTestDetails.push(await onebyoneValue);

                }


            } catch (error) {
            }
            return await listOfTestDetails;

        }

    }

    async setTagData(allConfigData) {
        //*** Set OR Tag Data */
        var elementKeyData = await allConfigData['ELEMENTTAGDATA'];
        if (elementKeyData === undefined) {
            elementKeyData = {};
            elementKeyData['LINK'] = "//a";
            elementKeyData['BUTTON'] = "//button";
            elementKeyData['TEXTBOX'] = "//input";
            elementKeyData['IMAGE'] = "//img";
            elementKeyData['CHECKBOX'] = "//input";
            elementKeyData['RADIOBUTTON'] = "//input";
            elementKeyData['LISTBOX'] = "//select";
            elementKeyData['TEXTAREA'] = "//textarea";
            elementKeyData['LABEL'] = "//label";
            elementKeyData['DEFAULT'] = "//*";
        }
        var allTagData = [];
        var tagData = await Object.keys(await elementKeyData);
        for (let i = 0; i < await tagData.length; i++) {
            var eleName = await tagData[i];
            var allDetails = { id: i + 1, type: eleName, tag: await elementKeyData[await eleName] };
            allTagData.push(await allDetails);
        }
        ConfigData.ORElementTagData = await allTagData;
    }

}
export default new ConfigGetter();

