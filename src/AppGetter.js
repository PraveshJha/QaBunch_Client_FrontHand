import { Config, Users } from '../src/QAautoMATER/Config'
import restAPI from '../src/QAautoMATER/funcLib/restAPI';
export class AppGetter {

    async isUserAlreadyLogged() {
        if (Config.fileSystemtechniques === 'api') {
            var backendAPI = await Config.backendAPI;
            if (Config.backendServiceAt === 'remote') {
                backendAPI = await Config.remoteBackendAPI;
            }
            try {
                var testBody ={};
                var userAccount = await  localStorage.getItem('UserSelectedAccount');
                testBody['userSelectedAccount']= await userAccount;
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var loginDetails = await restAPI.post(await backendAPI + 'usersession', await headers, await testBody);
                loginDetails = await loginDetails['data'];
                if (await loginDetails['isUserAuthenticated']) {
                    Users.isUserAuthenticated = true;
                    Users.userEmail = await Users.userEmail;
                    if (await loginDetails['isDemoUser']) {
                        Config.isDemo = true;
                    }
                    Users.firstName = await loginDetails['firstName'];
                    Users.lastName = await loginDetails['lastName'];
                    Users.expiresOn = await loginDetails['expiresOn'];
                    Users.isSuperAdmin = await loginDetails['isSuperAdmin'];
                    Users.AllUsersData = await loginDetails['allUsersProfile']; 
                    Users.userSelectedAccount = await userAccount;
                    Config.SelectedProject = await userAccount;
                }
                else {
                    Users.isUserAuthenticated = false;
                }
            }
            catch (error) { }
        }

    }
}
export default new AppGetter;

