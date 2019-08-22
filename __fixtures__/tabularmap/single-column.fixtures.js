import App from '../../src/App.js'

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
                "name": "position",
                "type": "geopoint",
                "format": "default"
              },
              {
                "name": "label",
                "type": "string"
              }
            ]
          },
          "_values": [
            {
              "position": "125.6, 10.1",
              "label": "My marker on the map 1"
            },
            {
              "position": "125.6, 10.2",
              "label": "My marker on the map 2"
            }
          ]
        }
      ],
      "specType": "tabularmap",
      "spec": {
        "infobox": "${data.label}"
      }
    }
  ]
}

export default {
  component: App,
  props: {datapackage, loading: false}
};
