import App from '../src/App.js'

const view = {
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

export default {
  component: App,
  props: {view}
};
