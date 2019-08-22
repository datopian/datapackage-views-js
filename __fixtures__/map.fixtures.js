import App from '../src/App.js'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "data": {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                125.6,
                10.1
              ]
            },
            "properties": {
              "name": "Dinagat Islands"
            }
          }
        }
      ],
      "specType": "map"
    }
  ]
}

const loading = false

export default {
  component: App,
  props: {datapackage, loading}
};
