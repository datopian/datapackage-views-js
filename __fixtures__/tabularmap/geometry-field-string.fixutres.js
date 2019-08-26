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
                "name": "geojson",
                "type": "string"
              },
              {
                "name": "label",
                "type": "string"
              }
            ]
          },
          "_values": [
            {
              "geojson": "(10.1, 125.6)",
              "label": "My marker on the map 1"
            },
            {
              "geojson": "(10.2, 125.6)",
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
