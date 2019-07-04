import App from '../src/App.js'

const view = {
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

export default {
  component: App,
  props: {view}
};
