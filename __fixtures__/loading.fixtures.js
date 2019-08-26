import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        "test"
      ],
      "specType": "table"
    }
  ]
}

const loading = true

export default {
  component: DataView,
  props: {datapackage, loading}
};
