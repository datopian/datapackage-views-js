import { DataView } from '../src/index'

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
                "type": "integer"
              },
              {
                "name": "b",
                "type": "integer"
              },
              {
                "name": "c",
                "type": "integer"
              },
              {
                "name": "d",
                "type": "integer"
              }
            ]
          },
          "data": [
            [
              "a",
              "b",
              "c",
              "d"
            ],
            [
              1,
              2,
              3,
              4
            ],
            [
              2,
              3,
              4,
              5
            ],
            [
              3,
              4,
              5,
              6
            ]
          ]
        }
      ],
      "specType": "simple",
      "spec": {
        "type": "line",
        "group": "a",
        "series": ["b", "c", "d"]
      }
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
