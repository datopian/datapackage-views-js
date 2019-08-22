import App from '../../src/App.js'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "_values": [
            {
              "lng": 125.6,
              "lat": 10.1,
              "label": "My marker on the map 1"
            },
            {
              "lng": 125.6,
              "lat": 10.2,
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
  component: App,
  props: {datapackage, loading: false}
};
