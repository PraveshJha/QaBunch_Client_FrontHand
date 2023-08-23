import { ORData } from './ORData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import ConfigGetter from '../../Web/Configuration/ConfigGetter'

export class ORGetter {

    async orPageLoad() {
        await this.readORData();
        ORData.AllConfigData=await ConfigGetter.readConfigurationFile('Mobile');
        await this.setLocator();
    }

    async saveORData() {
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
                dataforSend['keyForAddandUpdate'] = await ORData.NewAndUpdatedElement;
                dataforSend['keyForDelete'] = await ORData.DeletedKey;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'or/project/' + selectedProject + '/testingtype/Mobile', await headers, await dataforSend);
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
            const selectedProject = await  localStorage.getItem('UserSelectedAccount')
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.get(backendApi + 'or/project/' + selectedProject + '/testingtype/Mobile', await headers,);
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
                const selectedProject = await  localStorage.getItem('UserSelectedAccount')
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var dataforSend = {};
                dataforSend['elementtag'] = await ORData.ORTagDataToSave;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(backendApi + 'or/project/' + selectedProject + '/testingtype/Mobile/updatetag', await headers, await dataforSend);
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
      allBaseData.push({label:'Id',value:'id'});
      allBaseData.push({label:'Name',value:'class'}); 
      allBaseData.push({label:'Xpath',value:'text'}); 
      allBaseData.push({label:'LinkText',value:'class'}); 
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

