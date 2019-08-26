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
                "type": "array"
              },
              {
                "name": "label",
                "type": "string"
              }
            ]
          },
          "_values": [
            {
              "geojson": [125.6, 10.1],
              "label": "My marker on the map 1"
            },
            {
              "geojson": [125.6, 10.2],
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
