import { Config, Users } from '../../../QAautoMATER/Config';
import { ConfigData } from './ConfigData';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';

export class ConfigSetter {

    //**** Save Default Configuration******************************//

    async saveDefaultConfiguration() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var defaultConfigData = {};
                defaultConfigData["DefaultSelectedEnvironment"] = ConfigData.DefaultSelectedEnvironment;
                defaultConfigData["DefaultReportTrailCount"] = ConfigData.DefaultReportTrailCount;
                defaultConfigData["DefaultSaveDaysToReport"] = ConfigData.DefaultSaveDaysToReport;
                defaultConfigData["DefaultSaveDaysToDevelopment"] = ConfigData.DefaultSaveDaysToDevelopment;
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Api/defaultconfiguration', await headers, await defaultConfigData);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }

    }

    //**** Save Environment Details******************************//

    async saveEnvironmentDetails() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Api/envlist', await headers, await ConfigData.EnvNameList);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }

    }

    //**** Save URL Details******************************//

    async saveURLDetails() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Api/env/' + ConfigData.EnvNameForUrl + '/envurl', await headers, await ConfigData.EnvUrlList);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }

    }

    //**** Save HttpHeader Details******************************//

    async saveHttpHeaderDetails() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Api/httpheader', await headers, await ConfigData.HttpHeaderData);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }

    }

    //**** Save Authorization Details******************************//

    async saveAuthorizationDetails() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Api/auth', await headers, await ConfigData.AutherizationTableData);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }

    }

    async deleteReportData(envName, daysToDelete) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
                var reportData = {};
                reportData["envName"] = await envName;
                reportData["days"] = await daysToDelete;
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'cleanup/project/' + selectedProject + '/testingtype/Api', await headers, await reportData);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isSuccess'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }

    }

    async moveYourTestScripts() {
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
                testBody['sourceComponent'] = ConfigData.SelectedSourceComponentToMove;
                testBody['destinationComponent'] = ConfigData.SelectedDestinationComponentToMove;
                testBody['listOfTestId'] = ConfigData.ListOfTestIdToMove;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'configuration/project/' + selectedProject + '/testingtype/Api/movetestscripts', await headers, await testBody);
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
}
export default new ConfigSetter();

