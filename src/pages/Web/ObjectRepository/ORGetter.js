import { ORData } from './ORData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import ConfigGetter from '../../Web/Configuration/ConfigGetter'

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
                var selectedProject = await  localStorage.getItem('UserSelectedAccount');
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
            var selectedProject = await  localStorage.getItem('UserSelectedAccount');
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
                    var allDetails = { id: await counter, name: eleName, locator: await ORDataDetails[await eleName]['locator'], locatorproperty: await ORDataDetails[await eleName]['locatorproperty'], alternatexpath: await ORDataDetails[await eleName]['alternatexpath'] };
                        allData.push(await allDetails);
                        counter = Number(counter)+1;
                }
                ORData.AllORTableData = await allData;
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

