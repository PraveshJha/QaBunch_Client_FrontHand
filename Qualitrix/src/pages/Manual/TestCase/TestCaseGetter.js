import { TestCaseData } from './TestCaseData';
import { Config, Users } from '../../../QAautoMATER/Config';
import restAPI from '../../../QAautoMATER/funcLib/restAPI';
import ConfigGetter from '../Configuration/ConfigGetter';
import { ConfigData } from '../Configuration/ConfigData';
const selectedProject = Config.SelectedProject;
const selectedUserEmail = Users.userEmail;

export class TestCaseGetter {

    async loadTestCasePage() {
        await ConfigGetter.manualConfigPageLoad();
        TestCaseData.ListOfTestCycle = await ConfigData.ListOfTestCycle;
        TestCaseData.TestCaseTestCycle = await ConfigData.CurrentTestCycle;
        var placeHolderTreeData = await ConfigGetter.getPlaceHolderTreeData();
        TestCaseData.FolderTreeData = await placeHolderTreeData;
        try {
            await localStorage.removeItem('testId');
            await localStorage.removeItem(await localStorage.removeItem('testId'));
        }
        catch (error) { }
    }

    async saveTestCase() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            testBody['testCaseName'] = await TestCaseData.TestcaseName;
            testBody['placeHolder'] = await TestCaseData.PlaceHolderName;
            testBody['priority'] = await TestCaseData.TestcasePriority;
            testBody['testingType'] = await TestCaseData.TestCaseTestingType;
            testBody['automationType'] = await TestCaseData.TestCaseAutomationType;
            testBody['testCycle'] = await TestCaseData.TestCaseTestCycle;
            testBody['references'] = await TestCaseData.TestCaseReference;
            testBody['testPrecondition'] = await TestCaseData.TestCasePreCondition;
            testBody['testcaseData'] = await TestCaseData.TestCaseTestData;
            testBody['testSteps'] = await TestCaseData.TestCaseTestSteps;
            testBody['testExpectedResult'] = await TestCaseData.TestCaseExpectedResults;
            testBody['createdBy'] = await Users.userEmail;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/createnewtestcase', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileSaved'];
        }
    }

    async createNewPlaceHolderForTestCase() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            testBody['newPlaceHolderName'] = await TestCaseData.NewPlaceHolderName.trim();
            testBody['relativePath'] = await TestCaseData.SelectedPlaceHolderPath.trim();
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/addnewtesttree', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            if (await saveFile['isFileSaved']) {
                TestCaseData.FolderTreeData = await saveFile['testTreeData'];
            }
            return await saveFile['isFileSaved'];
        }
    }

    async isPlaceHolderAlreadyExist() {
        var folderTreeData = await TestCaseData.FolderTreeData;
        var actualTReeData = await folderTreeData;
        var relativePath = await TestCaseData.SelectedPlaceHolderPath;
        var folderNameToAdd = await TestCaseData.NewPlaceHolderName;
        var allChildNodes = await relativePath.split('/');
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

    async getAllTestCaseFromPath(relativePath) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return [{ id: 1, testId: 'QB-1', testname: 'My Test Case', component: 'Landing Page', priority: 'Medium', type: 'Functional', automationtype: 'Automated', cycle: 'Sprint 12.0', reference: '', createdby: 'Pravesh' }];
        }
        else {
            try {
                var testBody = {}
                testBody['componentPath'] = await relativePath;
                var backendApi = Config.backendAPI;
                var backendServiceLocation = await Config.backendServiceAt;
                if (backendServiceLocation === 'remote') {
                    backendApi = Config.remoteBackendAPI;
                }
                var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
                var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/gettestcase', await headers, await testBody);
                var alltestDetails = await serverResponse['data'];
                return await alltestDetails;
            }
            catch (error) {
                return [];
            }
        }
    }

    async saveTestComments(testComment) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            testBody['testComment'] = await testComment;
            var testCasePath = TestCaseData.UpdatedTestPlaceHolder + '/' + TestCaseData.UpdatedTestCycle + '/' + TestCaseData.TestId;
            testBody['testPath'] = await testCasePath;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/addtestcomment', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileSaved'];
        }
    }

    async getTestIdDetails() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            var testCasePath = TestCaseData.UpdatedTestPlaceHolder + '/' + TestCaseData.UpdatedTestCycle + '/' + TestCaseData.TestId;
            testBody['testPath'] = await testCasePath;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/gettestiddetails', await headers, await testBody);
            var testCaseDetails = await serverResponse['data'];
            return await testCaseDetails;
        }
    }

    async updateTestCase(history) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            var testCasePath = TestCaseData.UpdatedTestPlaceHolder + '/' + TestCaseData.UpdatedTestCycle + '/' + TestCaseData.TestId;
            testBody['testPath'] = await testCasePath;
            testBody['testCaseName'] = await TestCaseData.UpdatedTestName;
            testBody['priority'] = await TestCaseData.UpdatedTestPriority;
            testBody['testingType'] = await TestCaseData.UpdatedTestType;
            testBody['automationType'] = await TestCaseData.UpdatedTestAutomationType;
            testBody['references'] = await TestCaseData.UpdatedTestRefence;
            testBody['testPrecondition'] = await TestCaseData.UpdatedTestPrecondition;
            testBody['testcaseData'] = await TestCaseData.UpdatedTestData;
            testBody['testSteps'] = await TestCaseData.UpdatedTestSteps;
            testBody['testExpectedResult'] = await TestCaseData.UpdatedExpectedResults;
            testBody['history'] = await history;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/updatetestcase', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileSaved'];
        }
    }

    async deleteTestCase() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            var testCasePath = TestCaseData.UpdatedTestPlaceHolder + '/' + TestCaseData.UpdatedTestCycle + '/' + TestCaseData.TestId;
            testBody['testPath'] = await testCasePath;
            testBody['testId'] = await TestCaseData.TestId;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/deletetestcase', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileDeleted'];
        }
    }

    async getTestAutomationSteps() {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            var testCasePath = TestCaseData.UpdatedTestPlaceHolder + '/' + TestCaseData.UpdatedTestCycle + '/' + TestCaseData.TestId;
            testBody['testName'] = await TestCaseData.UpdatedTestName;
            testBody['testSteps'] = await TestCaseData.UpdatedTestSteps;
            testBody['testPrecondition'] = await TestCaseData.UpdatedTestPrecondition;
            testBody['testExpectedResult'] = await TestCaseData.UpdatedExpectedResults;
            testBody['testId'] = await TestCaseData.TestId;
            testBody['placeHolder'] = await testCasePath;
            //Remove Key
            try {
                await localStorage.removeItem('testId');
                await localStorage.removeItem(await TestCaseData.TestId);
            }
            catch (error) { }
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/getautomationsteps', await headers, await testBody);
            var testCaseDetails = await serverResponse['data'];
            await localStorage.setItem('testId', await TestCaseData.TestId);
            await localStorage.setItem(TestCaseData.TestId, JSON.stringify(await testCaseDetails));
            return await testCaseDetails;
        }
    }

    async getColumnNameIfValid(columnInfo) {
        var output = {};
        output['isvalid'] = false;
        output['component'] = -1;
        output['teststeps'] = -1;
        output['expectedresult'] = -1;
        output['priority'] = -1;
        output['name'] = -1;
        output['testdata'] = -1;
        output['precondition'] = -1;
        output['reference'] = -1;
        const allColumnInfo = await columnInfo.map(columnInfo => columnInfo.toLowerCase());
        for (let i = 0; i < await allColumnInfo.length; i++) {
            if (await allColumnInfo[i].includes('screen') || await allColumnInfo[i].includes('component') || await allColumnInfo[i].includes('module') || await allColumnInfo[i].includes('page')) {
                output['component'] = await i;
            }
            if (await allColumnInfo[i].includes('step')) {
                output['teststeps'] = await i;
            }
            if (await allColumnInfo[i].includes('expected result') || await allColumnInfo[i].includes('expectedresult')) {
                output['expectedresult'] = await i;
            }
            if (await allColumnInfo[i].includes('priority')) {
                output['priority'] = await i;
            }
            if (await allColumnInfo[i].includes('name') && (await allColumnInfo[i].includes('test case') || await allColumnInfo[i].includes('testcase'))) {
                output['name'] = await i;
            }
            if (await allColumnInfo[i].includes('testdata') || await allColumnInfo[i].includes('test data')) {
                output['testdata'] = await i;
            }
            if (await allColumnInfo[i].includes('precondition')) {
                output['precondition'] = await i;
            }
            if (await allColumnInfo[i].includes('reference')) {
                output['reference'] = await i;
            }
        }
        if (await Number(output['component']) > -1 && await Number(output['teststeps'] > -1) && await Number(output['name'] > -1) && await Number(output['expectedresult'] > -1)) {
            output['isvalid'] = true;
        }
        return await output;

    }

    async getMaxRangeForTestCase(rowIndex,componentColumnIndex,maxRowLenth,rowInfo) {
        var rangeSet =-1;
        if(await rowIndex === await maxRowLenth)
        {
            return await rowIndex;
        }
        else{
            for(let i= Number(await rowIndex)+1;i<maxRowLenth;i++)
            {
                var componentName = await rowInfo[i][await componentColumnIndex];
                if( await componentName !== '' && await componentName !== undefined)
                {
                    return await i
                }
            }
            return await maxRowLenth;
        }
    }

    async saveTestCaseWithTestAttribute(testcaseName, component, priority, testSteps, expectedResults,testData,reference,testPrecondition) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            if( await testcaseName ==='' || await component ==='' )
            {
                return ;
            }
            var testBody = {}
            testBody['testCaseName'] = await testcaseName;
            testBody['placeHolder'] = await component;
            testBody['priority'] = await priority;
            testBody['testingType'] = 'Functional';
            testBody['automationType'] = 'Not Automated';
            testBody['testCycle'] = await TestCaseData.TestCaseTestCycle;
            testBody['references'] = await reference;
            testBody['testPrecondition'] = await testPrecondition;
            testBody['testcaseData'] = await testData;
            testBody['testSteps'] = await testSteps;
            testBody['testExpectedResult'] = await expectedResults;
            testBody['createdBy'] = await Users.userEmail;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/createnewtestcase', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            return await saveFile['isFileSaved'];
        }
    }

    async createPlaceHolderFromExcelFile(allComponent) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var basePath = await selectedProject;
            var allPathDetails = await allComponent.split('/');
            for (let j = 0; j < await allPathDetails.length; j++) {
                var firstFolderName = await allPathDetails[j].trim();
                //@ my first placeholder
                var isComponentAlreadyExist = await this.isComponetWithSubComponentAlreadyExist(await basePath, await firstFolderName);
                if (await !isComponentAlreadyExist) {
                    var isPlaceHOlderCreated = await this.createNewPlaceHolderFromExcelSheet(await basePath, await firstFolderName);
                }
                basePath = await basePath + '/' + await firstFolderName
            }
        }
    }

    async isComponetWithSubComponentAlreadyExist(directoryName, folderNameToAdd) {
        var folderTreeData = await TestCaseData.FolderTreeData;
        var actualTReeData = await folderTreeData;
        var allChildNodes = await directoryName.split('/');
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

    async createNewPlaceHolderFromExcelSheet(relativePath, newPlaceHolderName) {
        if (Config.isDemo) {
            await new Promise(wait => setTimeout(wait, 2000));
            return true;
        }
        else {
            var testBody = {}
            testBody['newPlaceHolderName'] = await newPlaceHolderName;
            testBody['relativePath'] = await relativePath;
            var backendApi = Config.backendAPI;
            var backendServiceLocation = await Config.backendServiceAt;
            if (backendServiceLocation === 'remote') {
                backendApi = Config.remoteBackendAPI;
            }
            var headers = { 'Authorization': await Users.userToken, userEmail: await Users.userEmail };
            var serverResponse = await restAPI.post(await backendApi + 'manualtestcase/project/' + selectedProject + '/addnewtesttree', await headers, await testBody);
            var saveFile = await serverResponse['data'];
            Config.ErrorMessage = await saveFile['errorMessage'];
            if (await saveFile['isFileSaved']) {
                TestCaseData.FolderTreeData = await saveFile['testTreeData'];
            }
            return await saveFile['isFileSaved'];
        }
    }

    async createPathForComponent(allFolderPath) {
        try {
            var outPut = ''
            allFolderPath = await allFolderPath.replaceAll('(', '/');
            allFolderPath = await allFolderPath.replaceAll(')', '/');
            var allPathDetails = await allFolderPath.split('/');
            for (let i = 0; i < await allPathDetails.length; i++) {
                var name = await allPathDetails[i].trim();
                name = await name.replace(/[^a-zA-z0-9 ]/g, "").trim();
                if (name !== '') {
                    outPut = await outPut + '/' + await name;
                }
            }
            outPut = await outPut.substring(1);
            return await outPut;
        }
        catch (error) {
            return ''
        }

    }

}
export default new TestCaseGetter;

