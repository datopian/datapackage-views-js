import App from '../src/App.js'

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
                "name": "lat",
                "type": "number"
              },
              {
                "name": "lng",
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
              "lat": 125.6,
              "lng": 10.1,
              "label": "My marker on the map 1"
            },
            {
              "lat": 125.6,
              "lng": 10.2,
              "label": "My marker on the map 2"
            }
          ]
        }
      ],
      "specType": "tabularmap",
      "spec": {
        "latField": "lat",
        "lonField": "lng",
        "infobox": "label"
      }
    }
  ]
}

export default {
  component: App,
  props: {datapackage, loading: false}
};
