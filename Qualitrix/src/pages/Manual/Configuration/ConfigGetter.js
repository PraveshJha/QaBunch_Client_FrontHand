import { ConfigData } from './ConfigData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
const selectedProject = Config.SelectedProject;

export class ConfigGetter {

    async manualConfigPageLoad() {
        var allconfigData = null;
        if (!await Config.isDemo) {
            var configData = await this.getConfigData();
            ConfigData.AllConfigData = await configData;
        }
        await this.setTestCycleDropDown();

    }

    async setTestCycleDropDown() {
        if (Config.isDemo) {
            ConfigData.ListOfTestCycle = ['Sprint 12.1', 'Sprint 12.2', 'Sprint 12.3'];
            ConfigData.CurrentTestCycle = 'Sprint 12.1';
        }
        else {
            try{
            ConfigData.ListOfTestCycle = await ConfigData.AllConfigData['ListOfTestCycle'];
            var serverCurrentTestCycle = await ConfigData.AllConfigData['CurrentTestCycle'];
            if (await serverCurrentTestCycle === undefined || serverCurrentTestCycle === '') {
                if (await ConfigData.ListOfTestCycle.length > 0) {
                    ConfigData.CurrentTestCycle = await ConfigData.ListOfTestCycle[0];
                }
            }
            else {
                ConfigData.CurrentTestCycle = await serverCurrentTestCycle;
            }
        }
        catch(error)
        {
            ConfigData.ListOfTestCycle =[];
            ConfigData.CurrentTestCycle =''
        }
        }
    }

    async saveNewTestCycle() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            testBody['newTestCycle'] = await ConfigData.NewTestCycle;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(backendApi + 'manualconfiguration/project/' + selectedProject + '/newtestcycle', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileSaved'];
        }

    }

    async getConfigData() {
        var backendApi = Config.backendAPI;
        var backendServiceLocation = await Config.backendServiceAt;
        if (backendServiceLocation === 'remote') {
            backendApi = Config.remoteBackendAPI;
        }
        var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
        var serverResponse = await restAPI.get(backendApi + 'manualconfiguration/project/' + selectedProject, await headers);
        var configData = await serverResponse['data'];
        return await configData;
    }

    async saveCurrentTestCycle() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            testBody['currentTestCycle'] = await ConfigData.CurrentTestCycle;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(backendApi + 'manualconfiguration/project/' + selectedProject + '/currenttestcycle', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileSaved'];
        }

    }

    async getPlaceHolderTreeData() {
        if (await Config.isDemo) {

        }
        else {
            var backendApi = await Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendApi + 'manualconfiguration/project/' + selectedProject + '/testtree', await headers);
            var testTreeData = await serverResponse['data'];
            return await testTreeData;
        }

    }

    async getListOfUsers() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return ['demouser@test.com','mockuser@demo.com'];
        }
        else {
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendApi + 'manualconfiguration/listofusers', await headers);
            var allUsers = await serverResponse['data'];
            return await allUsers;
        }

    }
}
export default new ConfigGetter;

