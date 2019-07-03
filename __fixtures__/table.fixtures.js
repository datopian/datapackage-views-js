import App from '../src/App.js'

const view = {
  "id": 1,
  "resources": [
    {
      "name": "test",
      "data": [
        ["a", "b", "c", "d"],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6]
      ]
    }
  ],
  "specType": "table"
}

export default {
  component: App,
  props: {view}
};
