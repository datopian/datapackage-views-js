import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const datapackage = {
  views: [
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

ReactDOM.render(
  <App datapackage={datapackage} loading={false} />,
  document.getElementById(`datapackage-view-${view.id}`)
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
