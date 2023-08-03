import { ConfigData } from './ConfigData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';

const selectedProject = Config.SelectedProject;

export class ConfigGetter {

    async manualConfigPageLoad() {
        var configData = {};
        if (!await Config.isDemo) {
            configData = await this.getConfigData();
            ConfigData.AllConfigData = await configData;
        }
        await this.setTestCycleDropDown();
        await this.setEnvironment(await configData);
        var placeHolderTreeData = await this.getPlaceHolderTreeData();
        ConfigData.FolderTreeData = await placeHolderTreeData;
        

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

    async setEnvironment(configDataResponse)
    {
        if(await Config.isDemo)
        {

        }
        else{
            ConfigData.EnvUrlList = await configDataResponse['Environment'];
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
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            try {
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'manualconfiguration/project/' + await selectedProject + '/saveenvironment', await headers, await ConfigData.EnvUrlList);
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

    async deleteManualComponent() {
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
                testBody['component']= ConfigData.SelectedPlaceHolderPath;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'manualconfiguration/project/' + await selectedProject + '/deletecomponent', await headers, await testBody);
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

    async isPlaceHolderAlreadyExist(oldNamePath,newName) {
        var folderTreeData = await ConfigData.FolderTreeData;
        var actualTReeData = await folderTreeData;
        var relativePath = await oldNamePath;
        var folderNameToAdd = await newName;
        console.log(await relativePath);
        if(!await relativePath.includes('/'))
        {
            var allChildNodes = await relativePath;
        }
        else{
            var allChildNodes = await relativePath.split('/');
        }
        for (let i = 0; i < await allChildNodes.length; i++) {
            var keyNameToFind = await allChildNodes[i];
            for (let j = 0; j < await actualTReeData.length; j++) {
                var keyNameData = await actualTReeData[j]['key'];
                if (await keyNameData.toLowerCase().trim() === keyNameToFind.toLocaleLowerCase().trim()) {
                    actualTReeData = await actualTReeData[j]['nodes'];
                    break;
                }
            }
        }
        for (let i = 0; i < await actualTReeData.length; i++) {
            if (await folderNameToAdd.toLowerCase().trim() === await actualTReeData[i]['key'].toLowerCase().trim()) {
                return true;
            }
        }
        return false;
    }

    async renameManualComponent() {
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
                testBody['oldcomponent']= ConfigData.SelectedPlaceHolderPath;
                testBody['newcomponent']= ConfigData.NewComponentName;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'manualconfiguration/project/' + await selectedProject + '/renamecomponent', await headers, await testBody);
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

