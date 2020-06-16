import React from 'react';
import ReactDOM from 'react-dom';

const el = (
    <div>
      <h1>My ToDo List</h1>
        <input type="text" placeholder="" />
        <ul>
            <li>Learn React</li>
            <li>Build Awesome App</li>
        </ul>
    </div>
);

ReactDOM.render(el, document.getElementById('root'));

