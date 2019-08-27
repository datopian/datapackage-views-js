import { DataView } from '../../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "schema": {
            "fields": [
              {
                "name": "LON",
                "type": "number"
              },
              {
                "name": "LaT",
                "type": "number"
              },
              {
                "name": "label",
                "type": "string"
              }
            ]
          },
          "_values": [
            {
              "LON": 125.6,
              "LaT": 10.1,
              "label": "My marker on the map 1"
            },
            {
              "LON": 125.6,
              "LaT": 10.2,
              "label": "My marker on the map 2"
            }
          ]
        }
      ],
      "specType": "tabularmap"
    }
  ]
}

export default {
  component: DataView,
  props: {datapackage, loading: false}
};
