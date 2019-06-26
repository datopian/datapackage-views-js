import React from 'react';
import './App.css';
import Table from './Table.js';

const data = [
  ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
  ['2019', 10, 11, 12, 13],
  ['2020', 20, 11, 14, 13],
  ['2021', 30, 15, 12, 13],
];

function App() {
  return (
    <div className="App">
      <header className="h-6 bg-gray-300">
        <h1>Datapackage Views</h1>
      </header>
      <body>
        <div className="container m-24">
          <Table data={data} key="non-commercial-and-evaluation"/>
        </div>
      </body>
    </div>
  );
}

export default App;
