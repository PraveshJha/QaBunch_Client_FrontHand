import { ConfigData } from './ConfigData';
import { Config,Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';


export class ConfigGetter {

    async mobileConfigPageLoadData() {

    }

    async saveDefaultConfiguration() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            const selectedProject = await  localStorage.getItem('UserSelectedAccount')
            var defaultConfigData = {};
            defaultConfigData["DefaultSelectedEnvironment"] = ConfigData.DefaultSelectedEnvironment;
            defaultConfigData["DefaultReportTrailCount"] = ConfigData.DefaultReportTrailCount;
            defaultConfigData["DefaultSaveDaysToReport"] = ConfigData.DefaultSaveDaysToReport;
            defaultConfigData["DefaultSaveDaysToDevelopment"] = ConfigData.DefaultSaveDaysToDevelopment;
            defaultConfigData["DefaultScreenshotOption"] = ConfigData.SelectedScreenshot;
            defaultConfigData["DefaultDevice"] = ConfigData.DefaultDevice;
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
            const selectedProject = await  localStorage.getItem('UserSelectedAccount')
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
}
export default new ConfigGetter();

