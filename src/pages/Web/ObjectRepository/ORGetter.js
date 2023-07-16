import { ORData } from './ORData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';

const selectedProject = Config.SelectedProject;

export class ORGetter {

    async orPageLoad() {
        await this.readORData();
    }

    async saveORData() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var dataforSend = {};
                dataforSend['keyForAddandUpdate'] = await ORData.NewAndUpdatedElement;
                dataforSend['keyForDelete'] = await ORData.DeletedKey;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'or/project/' + selectedProject + '/testingtype/Web', await headers, await dataforSend);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }
    }

    async readORData() {
        if (Config.isDemo) {
            ORData.AllORTableData = [{ id: 1, name: 'inputUserName', locator: 'Name', locatorproperty: 'username', alternatexpath: '' }];
        }
        else {
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendApi + 'or/project/' + selectedProject + '/testingtype/Web', await headers,);
            var ORDataDetails = await serverResponse['data'];
            if (ORDataDetails === undefined) {
                ORData.AllORTableData = [];
            }
            else {
                var allData = [];
                var orData = await Object.keys(await ORDataDetails);
                var counter=1;
                for (let i = 0; i < await orData.length; i++) {
                    var eleName = await orData[i];
                    if (await eleName !== 'ELEMENTTAGDATA') {
                        var allDetails = { id: await counter, name: eleName, locator: await ORDataDetails[await eleName]['locator'], locatorproperty: await ORDataDetails[await eleName]['locatorproperty'], alternatexpath: await ORDataDetails[await eleName]['alternatexpath'] };
                        allData.push(await allDetails);
                        counter = Number(counter)+1;
                    }
                }
                ORData.AllORTableData = await allData;
            }
            //*** Set OR Tag Data */
            var elementKeyData = await ORDataDetails['ELEMENTTAGDATA'];
            if(elementKeyData ===undefined)
            {
                elementKeyData ={};
                elementKeyData['LINK'] ="//a";
                elementKeyData['BUTTON'] ="//button";
                elementKeyData['TEXTBOX'] ="//input";
                elementKeyData['IMAGE'] ="//img";
                elementKeyData['CHECKBOX'] ="//input";
                elementKeyData['RADIOBUTTON'] ="//input";
                elementKeyData['LISTBOX'] ="//select";
                elementKeyData['TEXTAREA'] ="//textarea";
                elementKeyData['LABEL'] ="//label";
                elementKeyData['DEFAULT'] ="//*";
            }
            var allTagData = [];
            var tagData = await Object.keys(await elementKeyData);
            for (let i = 0; i < await tagData.length; i++) {
                var eleName = await tagData[i];
                var allDetails = { id: i + 1, type: eleName, tag: await elementKeyData[await eleName] };
                allTagData.push(await allDetails);
            }
            ORData.ORElementTagData = await allTagData;
        }

    }

    async saveORTagData() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 3000));
            return true;
        }
        else {
            try {
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var dataforSend = {};
                dataforSend['elementtag'] = await ORData.ORTagDataToSave;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'or/project/' + selectedProject + '/testingtype/Web/updatetag', await headers, await dataforSend);
                var saveFile = await serverResponse['data'];
                Config.ErrorMessage = await saveFile['errorMessage'];
                return await saveFile['isFileSaved'];
            }
            catch (error) {
                Config.ErrorMessage = await error.message;
            }
        }
    }
}
export default new ORGetter();

