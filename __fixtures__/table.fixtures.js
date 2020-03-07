import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "_values": [
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
          ],
          "schema": {
            "fields": [
              {name: "a", type: "number", title: "title of a"},
              {name: "b", type: "number"},
              {name: "c", type: "number"},
              {name: "d", type: "any"}
            ]
          },
          "totalrowcount":4
        }
      ],
      "specType": "table"
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
