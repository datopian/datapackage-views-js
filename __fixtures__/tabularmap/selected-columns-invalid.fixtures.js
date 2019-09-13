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
              "lng": "foo",
              "lat": "bar",
              "label": "Bad"
            },
            {
              "lng": "baz",
              "lat": "boff",
              "label": "2bad"
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
