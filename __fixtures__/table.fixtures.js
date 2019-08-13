import App from '../src/App.js'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "data": [
            [
              "a",
              "b",
              "c",
              "d"
            ],
            [
              1,
              2,
              3,
              4
            ],
            [
              2,
              3,
              4,
              5
            ],
            [
              3,
              4,
              5,
              6
            ]
          ]
        }
      ],
      "specType": "table"
    }
  ]
}

const loading = false

export default {
  component: App,
  props: {datapackage, loading}
};
