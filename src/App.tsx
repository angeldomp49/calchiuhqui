import React from 'react';
import './App.css';
import { Grid } from './components/Grid';
import { Card } from './components/Card';
import { ContextMenuChildListener, ContextMenuParentListener } from './components/ContextMenu';
import {Id} from '@makechtec/randomkey';

function App() {

  let items = [
    {
      content: <div>hello div</div>
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    },
    {
      content: "hello world"
    }
  ];

  return (
    <div className="App">
      <ContextMenuParentListener
        createMenu={ () =>
          <ul>
            <li>option1</li>
            <li>option2</li>
            <li>option3</li>
            <li>option4</li>
          </ul>
        }
      >
        <Grid cols={5} gap={2}>
          {
            items.map( (item: any) => 
              <ContextMenuChildListener key={Id.generate()} > 
                <Card>
                  {item.content}
                </Card>
              </ContextMenuChildListener>)
          }
        </Grid>
      </ContextMenuParentListener>
    </div>
  );
}

export default App;
