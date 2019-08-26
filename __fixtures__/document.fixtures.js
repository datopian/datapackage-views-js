import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "format": "pdf",
          "path": "http://www.africau.edu/images/default/sample.pdf"
        }
      ],
      "specType": "document"
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
