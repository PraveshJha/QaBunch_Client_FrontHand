import DataGeneratorUtility from "../funcLib/DataGeneratorUtility";
import DateTimeUtility from "../funcLib/DateTimeUtility";
export var DynamicData = [
    { id: 1, key: 'firstName', custom: '' },
    { id: 2, key: 'lastName', custom: '' },
    { id: 3, key: 'address', custom: '' },
    { id: 4, key: 'email', custom: '' },
    { id: 5, key: 'uuid', custom: '' },
    { id: 6, key: 'country', custom: '' },
    { id: 7, key: 'state', custom: '' },
    { id: 8, key: 'city', custom: '' },
    { id: 9, key: 'zipCode', custom: '' },
    { id: 10, key: 'phoneNumber', custom: '' },
    { id: 11, key: 'word(length=10)', custom: '' },
    { id: 12, key: 'string(length=10)', custom: '' },
    { id: 13, key: 'number(min=1,max=99999)', custom: '' },
    { id: 14, key: 'date(addorsubtractDaysfromPrsentDate=0,dateTemplate=DD-MM-yyyy)', custom: '' },
];
export class DynamicDataGetter {

    async getValueFromDynamicData(dataKey, param) {
        switch (dataKey) {
            case "firstName":
                return await DataGeneratorUtility.getFirstName();
            case "lastName":
                return await DataGeneratorUtility.getLastName();
            case "address":
                return await DataGeneratorUtility.getAddress();
            case "email":
                return await DataGeneratorUtility.getEmail();
            case "uuid":
                return await DataGeneratorUtility.getUuid();
            case "country":
                return await DataGeneratorUtility.getCountry();
            case "state":
                return await DataGeneratorUtility.getState();
            case "city":
                return await DataGeneratorUtility.getCity();
            case "zipCode":
                return await DataGeneratorUtility.getZipCode();
            case "phoneNumber":
                return await DataGeneratorUtility.getPhoneNumber();
            case "word(length=10)":
                if (Number(param) > 0) {
                    return await DataGeneratorUtility.getWords(Number(param));
                }
                else
                    return await DataGeneratorUtility.getWords(10);
            case "string(length=10)":
                if (Number(param) > 0) {
                    return await DataGeneratorUtility.getString(Number(param));
                }
                else
                    return await DataGeneratorUtility.getString(10)
            case "number(min=1,max=99999)":
                if (param.includes(',')) {
                    var minRange = param.split(',')[0];
                    var maxRange = param.split(',')[1];
                    try {
                        return await DataGeneratorUtility.getNumberFromRange(Number(minRange), Number(maxRange));
                    }
                    catch (error) {
                        return await DataGeneratorUtility.getNumberFromRange(1, 99999);
                    }

                }
                else
                    return await DataGeneratorUtility.getNumberFromRange(1, 99999);
            case "date(addorsubtractDaysfromPrsentDate=0,dateTemplate=DD-MM-yyyy)":
                if (param.trim() !== '') {
                    var daytoadd = param.split(',')[0];
                    var template = param.split(',')[1];
                    try {
                        return await DateTimeUtility.addOrSubtractDaysToCurrentDate(Number(daytoadd), template)
                    }
                    catch (error) {
                        return await DateTimeUtility.addOrSubtractDaysToCurrentDate(0, "DD-MM-yyyy")
                    }

                }
                else
                    return await DateTimeUtility.addOrSubtractDaysToCurrentDate(0, "DD-MM-yyyy")

            default:
                return undefined;
        }
    }

}
export default new DynamicDataGetter;