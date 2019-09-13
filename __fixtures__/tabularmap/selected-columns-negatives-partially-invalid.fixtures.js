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
                "name": "lng",
                "type": "string"
              },
              {
                "name": "lat",
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
              "lng": 125.6,
              "lat": "NOPE",
              "label": "My marker on the map 1"
            },
            {
              "lng": 125.6,
              "lat": -10.2,
              "label": "My marker on the map 2"
            }
          ]
        }
      ],
      "specType": "tabularmap",
      "spec": {
        "lonField": "lng",
        "latField": "lat",
        "infobox": "This is my popup message: ${data.label}"
      }
    }
  ]
}

export default {
  component: DataView,
  props: {datapackage, loading: false}
};
