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
                "name": "lon",
                "type": "number"
              },
              {
                "name": "lat",
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
              "lon": 125.6,
              "lat": 10.1,
              "label": "My marker on the map 1"
            },
            {
              "lon": 125.6,
              "lat": 10.2,
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
