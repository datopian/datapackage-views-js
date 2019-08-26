import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "path": "http://example.com/data",
          "unavailable": true
        }
      ],
      "specType": "table"
    }
  ]
}

export default {
  component: DataView,
  props: {datapackage}
};
