import { DataView } from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "web-page",
          "path": "http://www.example.com/"
        }
      ],
      "specType": "web",
      "page_url": "https://datahub.io/core/co2-ppm/view/0"
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
