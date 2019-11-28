import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "_values": [
            {a:1, b:2, c:3},
            {a:4, b:5, c:6},
            {a:7, b:8, c:9}
          ],
          "schema": {
            "fields": [
              {name: "a", type: "number", title: "Column A"},
              {name: "b", type: "number"},
              {name: "c", type: "number"}
            ]
          }
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
