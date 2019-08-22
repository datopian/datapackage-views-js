import App from '../src/App.js'

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
  component: App,
  props: {datapackage, loading}
};
