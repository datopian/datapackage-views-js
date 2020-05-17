import { DataView } from '../../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "_values": [
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 101,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 1908.792,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 147,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 175.953,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 151,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 716.075,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 153,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 218.763,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 155,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 133.998,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 157,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 380.276,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 159,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 484.786,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 161,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 189.058,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 163,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 434.099,
            "CentralPower": null,
            "DecentralPower": null
            },
            {
            "Month": "2020-04-01T00:00:00",
            "MunicipalityNo": 165,
            "OnshoreWindPower": null,
            "OffshoreWindPower": null,
            "SolarPower": 170.504,
            "CentralPower": null,
            "DecentralPower": null
            }
          ],
          "schema": {
            "fields": [
              {
              "comment": "-",
              "description": "Year and month",
              "title": "Month",
              "property_constraint": "",
              "name": "Month",
              "validation_rules": "",
              "type": "datetime",
              "example": "2017-01",
              "unit": "Months",
              "size": "7"
              },
              {
              "comment": "The municipality number can be found by searcing \"kommunenumre\" on the internet. ",
              "description": "Each of the (currently) 98 Danish municipalityes has a unique number (code), ranging from 101 (Copenhagen) to 860 (Hjoerring).",
              "title": "Municipality number",
              "property_constraint": "",
              "name": "MunicipalityNo",
              "validation_rules": "",
              "type": "integer",
              "example": "101",
              "unit": "Coded",
              "size": "3"
              },
              {
              "description": "Electricity production from onshore wind power",
              "title": "Onshore wind power",
              "property_constraint": "",
              "format": "([0-9]*[,])[0-9]",
              "name": "OnshoreWindPower",
              "validation_rules": ">=0",
              "type": "number",
              "example": "184.3",
              "unit": "MWh per hour",
              "size": "9.1"
              },
              {
              "description": "Electricity production from offshore wind power",
              "title": "Offshore wind power",
              "property_constraint": "",
              "format": "([0-9]*[,])[0-9]",
              "name": "OffshoreWindPower",
              "validation_rules": ">=0",
              "type": "number",
              "example": "184.3",
              "unit": "MWh per hour",
              "size": "9.1"
              },
              {
              "comment": "-",
              "description": "Electricity production from Solar power",
              "title": "Solar power",
              "property_constraint": "",
              "format": "([0-9]*[,])[0-9]",
              "name": "SolarPower",
              "validation_rules": ">=0",
              "type": "number",
              "example": "184.3",
              "unit": "MWh per hour",
              "size": "9.2"
              },
              {
              "comment": "x",
              "description": "Electricity production from central power plants",
              "title": "Central Power plants",
              "property_constraint": "",
              "format": "([0-9]*[,])[0-9]",
              "name": "CentralPower",
              "validation_rules": ">=0",
              "type": "number",
              "example": "543,45",
              "unit": "MWh",
              "size": "9.1"
              },
              {
              "comment": "x",
              "description": "Electricity production from decentral power plants",
              "title": "Decentral Power plants",
              "property_constraint": "",
              "format": "([0-9]*[,])[0-9]",
              "name": "DecentralPower",
              "validation_rules": ">=0",
              "type": "number",
              "example": "543,45",
              "unit": "MWh",
              "size": "9.1"
              }
            ],
            "primary_key": [
              "Month",
              "MunicipalityNo"
            ]
          },
          "totalrowcount":4
        }
      ],
      "specType": "table"
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
