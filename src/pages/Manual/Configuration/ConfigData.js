export var ConfigData = {
    AllConfigData: {},
    ListOfTestCycle:[],
    CurrentTestCycle:'',
    IsErrorOnCurrentTestCycle:false,
    NewTestCycle:'',
    IsErrorOnNewTestCycle:false,
    EnvUrlList:[],
    SelectedRowFromUrlTable:-1,
    IsNameValidforUrlTable:true,
    FolderTreeData:[],
    SelectedPlaceHolderPath:'',
    SelectedPlaceHolderLabel:'',
    NewComponentName:'',
    IsErrorOnNewComponentName:false,
    ComponentDeleteMessage:'Are you sure,you want to delete the component? After deleting the component, all test cases will be deleted, and you cannot roll back. The application can behave abnormally if test cases are updated or executed by an existing user.',
    ComponentRenameMessage:'Are you sure,you want to rename the component? After updating the component name, all test cases component will be updated.The application can behave abnormally if test cases are updated or executed by an existing user.'
};