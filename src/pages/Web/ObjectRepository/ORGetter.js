import { ORData } from './ORData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import ConfigGetter from '../../Web/Configuration/ConfigGetter'
const selectedProject = await  localStorage.getItem('UserSelectedAccount')

export class ORGetter {

    async orPageLoad() {
        await this.readORData();
        ORData.AllConfigData=await ConfigGetter.readConfigurationFile('Web');
        await this.setLocator();
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
    async  setLocator()
    {
      var allBaseData =[];
      allBaseData.push({label:'id',value:'id'});
      allBaseData.push({label:'name',value:'name'}); 
      allBaseData.push({label:'xpath',value:'xpath'}); 
      allBaseData.push({label:'linktext',value:'linktext'}); 
      allBaseData.push({label:'partiallinktext',value:'partiallinktext'}); 
      allBaseData.push({label:'class',value:'class'}); 
      allBaseData.push({label:'cssselector',value:'cssselector'}); 
      if(Config.isDemo)
      {
        ORData.AllLocatorList = await allBaseData;
      }
      else{
        var allLOc = await ORData.AllConfigData['Locator'];
        if(await allLOc === undefined)
        {
            ORData.AllLocatorList = await allBaseData;
        }
        else{
            var customLoctor =[];
            for(let i=0;i<await allLOc.length;i++)
            {
                var locName = await allLOc[i].trim();
                customLoctor.push({label:await locName,value:await locName})
            }
            ORData.AllLocatorList = await customLoctor;
        }
      }
    }
}
export default new ORGetter();

