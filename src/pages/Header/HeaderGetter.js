import { Config, Users } from '../../QAautoMATER/Config';
import restAPI from '../../QAautoMATER/funcLib/restAPI';
const selectedProject = await  localStorage.getItem('UserSelectedAccount')


export class HeaderGetter {

  async isNewUserDataValid(userData) {
    var output ={};
    output['isValid'] = false;
    output['errorMessage'] = '';
    try {
       var allRowInfo = await userData;
       var allEmail =[];
       for(let i=0;i<await allRowInfo.length;i++)
       {
         var email = await allRowInfo[i]['email'];
         var firstname = await allRowInfo[i]['firstname'];
         var lastname = await allRowInfo[i]['lastname'];
         var password = await allRowInfo[i]['password'];
         if(await email.trim() ==='' || await firstname.trim() ==='' || await lastname.trim() ==='' || await password.trim() ==='')
         {
           output['errorMessage'] = 'Please fill mandatory column, before adding new row.';
           return output;
         }
         if(await allEmail.includes(await email.toString().toLowerCase()))
         {
           output['errorMessage'] = 'Duplicate Email '+await email +' are found.';
           return output;
         }
         else{
          await allEmail.push(await email.toString().toLowerCase() );
         }
       }
       output['isValid'] = true;
    }
    catch (error) {
    }
    return await output
  }

  async createNewProfileData(userData) {
    var output ={};
    output['isSuccess'] = false;
    output['errorMessage'] = '';
    try {
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
            testBody['allUserData']= await userData;
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(backendApi + 'users/addnewuser', await headers, await testBody);
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
    catch (error) {
    }
    return await output
  }

}
export default new HeaderGetter();

