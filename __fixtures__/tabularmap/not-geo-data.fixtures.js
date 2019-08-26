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
                "name": "a",
                "type": "number"
              },
              {
                "name": "b",
                "type": "number"
              }
            ]
          },
          "_values": [
            {
              "a": 1,
              "b": 2
            },
            {
              "a": 3,
              "b": 4
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
