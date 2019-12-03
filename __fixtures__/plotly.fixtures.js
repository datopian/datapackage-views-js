import {DataView} from '../src/index'

const datapackage = {
  "views": [
    {
      "id": 1,
      "resources": [
        {
          "name": "test",
          "schema": {
            "fields": [
              {
                "name": "a",
                "type": "integer"
              },
              {
                "name": "b",
                "type": "integer"
              },
              {
                "name": "c",
                "type": "integer"
              },
              {
                "name": "d",
                "type": "integer"
              }
            ]
          },
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
      "specType": "plotly",
      "spec": {
        "group": "a",
        "series": ["b", "c", "d"],
        "data": [
          {"type": "bar"}
        ],
        "layout": {
          "title": "Plotly Layout Title",
          "height": 450,
          "xaxis": {
            "title": 'X Axis Title'
          },
          "yaxis": {
            "title": 'Y Axis Title'
          },
          "font": {
            "family": "\"Open Sans\", verdana, arial, sans-serif",
            "size": 12,
            "color": "rgb(169, 169, 169)"
          },
          "titlefont": {
            "family": "\"Open Sans\", verdana, arial, sans-serif",
            "size": 17,
            "color": "rgb(76, 76, 76)"
          }
        },
        "config": {
          "displayModeBar": false
        }
      }
    }
  ]
}

const loading = false

export default {
  component: DataView,
  props: {datapackage, loading}
};
