import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "resource",
          "path": "http://www.example.com/"
        }
      ],
      "specType": "unsupported"
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
