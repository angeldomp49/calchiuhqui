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
      content: "hello world 1"
    },
    {
      content: "hello world 2"
    },
    {
      content: "hello world 3"
    },
    {
      content: "hello world 4"
    },
    {
      content: "hello world 5"
    },
    {
      content: "hello world 6"
    },
    {
      content: "hello world 7"
    },
    {
      content: "hello world 8"
    },
    {
      content: "hello world 9"
    }
  ];

  return (
    <div className="App">
      <ContextMenuParentListener
        createMenu={ (bagInfo: any) =>
          <ul>
            <li>{bagInfo.content}</li>
            <li>option2</li>
            <li>option3</li>
            <li>option4</li>
          </ul>
        }
      >
        <Grid cols={5} gap={2}>
          {
            items.map( (item: any) => 
              <ContextMenuChildListener 
                key={Id.generate()} 
                bagInfo={{content: item.content}}
              > 
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
