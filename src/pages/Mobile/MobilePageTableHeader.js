import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { textFilter } from 'react-bootstrap-table2-filter';
import { Type } from 'react-bootstrap-table2-editor';
import GetData from "../../QAautoMATER/funcLib/getData";
import Matcher from "../../QAautoMATER/funcLib/matcher";
import { ConfigData } from "./Configuration/ConfigData";
import { TestData } from "./TestData/TestData";
import { ORData } from "./ObjectRepository/ORData";
export var EnvironmentURLTableHeader = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '30px' }
}, {
	dataField: 'name',
	text: 'Environment',
	headerStyle: { width: '80px' },
	validator: async (newValue, row, column, done) => {
		var format = /[^A-Za-z0-9-]/ig;
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Environment can not be blank'
			});
		}
		if (format.test(await newValue)) {
			return done({
				valid: false,
				message: 'Environment should not have special character.'
			});
		}
		var allColumnValue = await GetData.jsonArrayGetallKeyValue(ConfigData.EnvUrlList, 'name')
		var isPresent = await Matcher.isValuePresentInArray(allColumnValue, await newValue);
		if (isPresent) {
			return done({
				valid: false,
				message: 'Environment can not be duplicate.'
			});
		}
		else {
			return done();
		}
	}
},
{
	dataField: 'apk',
	text: 'App apk',
	headerStyle: { width: '120px' },
	validator: async (newValue, row, column, done) => {
		return done();
	}
}
];
export var CommonTestDataHeaderTable = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '50px' }
}, {
	dataField: 'key',
	text: 'Data Key',
	headerStyle: { width: '300px' },
	validator: async (newValue, row, column, done) => {
		var format = /[^A-Za-z]/ig;
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Data key can not be blank.'
			});
		}
		if (format.test(await newValue)) {
			return done({
				valid: false,
				message: 'Data key only accept alphabets.'
			});
		}
		var allColumnValue = await GetData.jsonArrayGetallKeyValue(await TestData.AllCommonTestData, 'key')
		var isPresent = await Matcher.isValuePresentInArray(await allColumnValue, await newValue);
		if (isPresent) {
			return done({
				valid: false,
				message: 'Data key can not be duplicate.'
			});
		}
		else {
			return done();
		}
	},
	filter: textFilter(
		{
			placeholder: 'Search data key',
		}
	)
},
{
	dataField: 'value',
	text: 'Value',
	headerStyle: { width: '400px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Value can not be blank'
			});
		}
		else {
			return done();
		}
	},
	filter: textFilter(
		{
			placeholder: 'Search data',
		}
	)
}
];
export var ORTableHeader = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '60px' }
}, {
	dataField: 'name',
	text: 'Name',
	headerStyle: { width: '300px' },
	validator: async (newValue, row, column, done) => {
		var format = /[^A-Za-z]/ig;
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Name can not be blank.'
			});
		}
		if (format.test(await newValue)) {
			return done({
				valid: false,
				message: 'Name only accept alphabets.'
			});
		}
		var allColumnValue = await GetData.jsonArrayGetallKeyValue(TestData.AllCommonTestData, 'key')
		var isPresent = await Matcher.isValuePresentInArray(allColumnValue, await newValue);
		if (isPresent) {
			return done({
				valid: false,
				message: 'Name can not be duplicate.'
			});
		}
		else {
			return done();
		}
	},
	filter: textFilter(
		{
			placeholder: 'Search By Name',
		}
	)
},
{
	dataField: 'locator',
	text: 'Locator',
	headerStyle: { width: '150px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Locator can not be blank'
			});
		}
		else {
			return done();
		}
	},
	editor: {
		type: Type.SELECT,
		getOptions: (setOptions) => {
			setTimeout(() => {
				setOptions(ORData.AllLocatorList);
			}, 0);
		}
	},
	filter: textFilter(
		{
			placeholder: 'Search By Locator',
		}
	)
},
{
	dataField: 'locatorproperty',
	text: 'Locator Property',
	headerStyle: { width: '350px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Locator Property can not be blank'
			});
		}
		else {
			return done();
		}
	},
	filter: textFilter(
		{
			placeholder: 'Search By Locator Property',
		}
	)
},
{
	dataField: 'alternatexpath',
	text: 'Alternate Xpath',
	headerStyle: { width: '200px' },
	validator: async (newValue, row, column, done) => {
		return done();
	},
	hidden: true
}
];

export var ORElementTagHeader = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '60px' }
}, {
	dataField: 'type',
	text: 'Webelement type',
	editable: false,
},
{
	dataField: 'tag',
	text: 'Android Tag',
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Tag can not be blank'
			});
		}
		else {
			return done();
		}
	},
},
{
	dataField: 'iostag',
	text: 'iOS Tag',
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Tag can not be blank'
			});
		}
		else {
			return done();
		}
	},
}
];
export var EmulatorTableHeader = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '30px' }
},
{
	dataField: 'platform',
	text: 'Platform',
	headerStyle: { width: '80px' },
	editor: {
		type: Type.SELECT,
		options: [{ label: 'Android', value: 'Android' }, { label: 'iOS', value: 'iOS' }],
	},
},
{
	dataField: 'device',
	text: 'Device Type',
	headerStyle: { width: '80px' },
	editor: {
		type: Type.SELECT,
		options: [{ label: 'Mobile', value: 'Mobile' }, { label: 'Tablet', value: 'Tablet' }],
	},
},
{
	dataField: 'name',
	text: 'Screen Name',
	headerStyle: { width: '120px' },
	validator: async (newValue, row, column, done) => {
		var format = /[^A-Za-z0-9-_. ]/ig;
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Screen Name can not be blank'
			});
		}
		if (format.test(await newValue)) {
			return done({
				valid: false,
				message: 'Screen Name should not have special character.'
			});
		}
		var allColumnValue = await GetData.jsonArrayGetallKeyValue(ConfigData.AllEmulatorTableData, 'name')
		var isPresent = await Matcher.isValuePresentInArray(allColumnValue, await newValue);
		if (isPresent) {
			return done({
				valid: false,
				message: 'Screen Name can not be duplicate.'
			});
		}
		else {
			return done();
		}
	}
},
{
	dataField: 'apppackage',
	text: 'appPackage',
	headerStyle: { width: '120px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'appPackage can not be blank.'
			});
		}
		return done();
	}
},
{
	dataField: 'apppactivity',
	text: 'appActivity',
	headerStyle: { width: '120px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'appActivity can not be blank.'
			});
		}
		return done();
	}
}
];
export var TestToolTableHeader = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '30px' }
},
{
	dataField: 'tool',
	text: 'Tool',
	headerStyle: { width: '80px' },
	editor: {
		type: Type.SELECT,
		options: [{ label: 'Jira', value: 'Jira' }, { label: 'TestRail', value: 'TestRail' }, { label: 'Zypher', value: 'Zypher' }],
	},
	validator: async (newValue, row, column, done) => {
		var allColumnValue = await GetData.jsonArrayGetallKeyValue(ConfigData.AllTestManagementToolData, 'tool')
		var isPresent = await Matcher.isValuePresentInArray(allColumnValue, await newValue);
		if (isPresent) {
			return done({
				valid: false,
				message: 'Tool name can not be duplicate.'
			});
		}
		else {
			return done();
		}
	}
},
{
	dataField: 'url',
	text: 'Url',
	headerStyle: { width: '130px' },
	validator: async (newValue, row, column, done) => {
		var allColumnValue = await GetData.jsonArrayGetallKeyValue(ConfigData.AllTestManagementToolData, 'url')
		var isPresent = await Matcher.isValuePresentInArray(allColumnValue, await newValue);
		if (isPresent) {
			return done({
				valid: false,
				message: 'Url can not be duplicate.'
			});
		}
		else {
			return done();
		}
	}
},
{
	dataField: 'username',
	text: 'Username',
	headerStyle: { width: '80px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Width can not be blank'
			});
		}
		else {
			return done();
		}
	}
},
{
	dataField: 'password',
	text: 'Password',
	headerStyle: { width: '80px' },
	validator: async (newValue, row, column, done) => {
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Hieght can not be blank'
			});
		}
		else {
			return done();
		}
	}
}
];
export var CustomLocator = [{
	dataField: 'id',
	text: '#',
	headerStyle: { width: '60px' }
},
{
	dataField: 'locator',
	text: 'Locator',
	validator: async (newValue, row, column, done) => {
		var format = /[^A-Za-z-]/ig;
		if (await newValue.trim() === '') {
			return done({
				valid: false,
				message: 'Locator can not be blank'
			});
		}
		if (format.test(await newValue)) {
			return done({
				valid: false,
				message: 'Locator should not have special character and number.'
			});
		}
		else {
			return done();
		}
		
	}
}
];

