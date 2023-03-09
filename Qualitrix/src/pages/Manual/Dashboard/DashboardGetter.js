import { DashboardData } from './DashboardData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import ConfigGetter from '../Configuration/ConfigGetter';
import { ConfigData } from '../Configuration/ConfigData';
const selectedProject = Config.SelectedProject;
const selectedUserEmail = Users.userEmail;

export class DashboardGetter {

    async loadDashboardPage() {

    }

}
export default new DashboardGetter;

