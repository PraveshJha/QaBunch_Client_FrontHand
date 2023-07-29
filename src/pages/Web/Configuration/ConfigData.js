export var ConfigData = {
    AllConfigData: {},
    EnvUrlList: [],
    EnvironmentList: [],
    DefaultSelectedEnvironment: '',
    ValidateDefaultSelectedEnvironment: '',
    DefaultReportTrailCount: 0,
    ValidatedefaultReportTrailCount: false,
    DefaultSaveDaysToReport: 0,
    ValidatedeDefaultSaveDaysToReport: false,
    DefaultSaveDaysToDevelopment: 0,
    ValidatedeSaveDaysToDevelopment: false,
    ErrorMessageDefaultConfiguration: 'Please add the correct details for highlited field in default configuration section',
    SuccessMessageDefaultConfiguration: 'Default configuration values are successfully saved.',
    SuccessMessageForDeleteEnv: 'Selected environment gets successfully deleted.',
    ValidateEnvNameFromURL: false,
    SelectedRowFromUrlTable: '',
    ErrorMessage: '',
    AllExecutionPlatform: ['Desktop', 'Mobile', 'Tablet'],
    AllBrowserList: ['Chrome'],
    AllMobileEmulator: [],
    AllTabletEmulator: [],
    IsErrorOnExecutionPlatform: false,
    DefaultExecutionPlatform: 'Desktop',
    IsErrorOnBrowser: false,
    DefaultBrowser: 'Chrome',
    IsErrorOnMobileEmulator: false,
    DefaultMobileEmulator: '',
    IsErrorOnTabletEmulator: false,
    DefaultTabletEmulator: '',
    AllEmulatorTableData:[],
    SelectedRowFromEmulatorTable: '',
    IsDataValidInEmulatorTable:true,
    AllTestManagementToolData:[],
    SelectedRowFromToolTable:'',
    IsDataValidInToolTable:true,
    AllExecutionServer:['Selenium grid','BrowserStack','LamdaTest','SauceLabs'],
    IsErrorOnExecutionAt:false,
    ExecutionServer:'Selenium grid',
    IsErrorOnServerUrl:false,
    ServerUrl:'',
    CommonCapability :{setAcceptInsecureCerts:true,setAlertBehavior:null,setBrowserVersion:null,setPlatform:null,setProxy:null},
    AllCapabilities:{Desktop:{"Chrome":{},"Firefox":{},"Edge":{},"Safari":{}},Mobile:{},Tablet:{}},
    CleanUpEnvironment:'',
    SelectedDaysForDelete:'7 Days',
    IsErrorOnCleanUpEnvironment:false,
    IsErrorOnDayToDelete:false,
    ScreenshotOptionList:['For failure & success','For each step'],
    SelectedScreenshot:'For failure & success',
    SelectedComponent:'',
    ComponentList:[],
    MaxReportCounter:0,
};