import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import Slider from '@material-ui/core/Slider';

import what_logo from './assets/logo.png';
import './App.css';

interface User {
  active: boolean;
  frequency: number;
  diff: number;
  nouns: boolean;
  adj: boolean;
  verb: boolean;
  adverb: boolean;
  word: boolean;
}

const App: React.FC = () => {

  // const [active, setActive] = useState(true);
  // const [frequency, setFrequency] = useState(10);
  // const [diff, setDiff] = useState(10);
  // const [nouns, setNouns] = useState(true);
  // const [adj, setAdj] = useState(true);
  // const [verb, setVerb] = useState(true);
  // const [adverb, setAdverb] = useState(true);

  const [ user, setUser ] = useState<User>({
    active:true,
    frequency:10,
    diff: 10, 
    nouns: true,
    adj:true,
    verb:true,
    adverb:true, 
    word:false
  });

  const handleChange = (change: Partial<typeof user>) => {
    setUser(oldUser => ({
      ...oldUser,
      ...change
    }))
  }

  

  // useEffect(() => {
  //   chrome.storage.sync.get(['user'], function (result: User) {
  //     if (result) setUser(result);
  //   });    
  // }, []);


  //put all of the variables into storage
  useEffect(() => {
    chrome.storage.sync.set({"user":user});
  }, [ user ]);
  
  const {
    active,
    frequency,
    diff, 
    nouns,
    adj,
    verb,
    adverb,
    word
  } = user;

  return (
    <div className="container">
        
        <div className="header">
          <img src={what_logo} className="logo" />
          <p className="desc">Learn French while you surf!</p>
          <Switch className="switch" onChange={val => handleChange({ active: val })} checked={active} />
        </div>

        <div className="section"> 

          <div> <p className="setting">Frequency</p>
            <p className="setting-desc">How often you'd like to see translations</p>
          </div>

          <Slider
            value={frequency}
            onChange={(e, change) => handleChange({ frequency: change as number })}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />

        </div>

        <div className="second-slider"> 

          <div> <p className="setting">Difficulty</p>
          <p className="setting-desc">How comfortable with French are you? </p>
          
          </div>
    
          <Slider
            value={diff}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={100}
            onChange={(e, val) => handleChange({ diff: val as number })}
          />

        </div>

        <div className="divider">Please select which type of Words you'd like to focus on: </div>

        <div className="drop-section"> 

          <div> <p className="setting">Nouns</p>
          <p className="setting-desc">Description </p>
          
          </div>
    
          <div className="round">
            <button onChange={() => handleChange({ nouns: !nouns })} className="anim" />
          </div>
        </div>

        <div className="drop-section"> 

          <div> <p className="setting">Adjectives</p>
          <p className="setting-desc">Description </p>
          
          </div>
    
          <div className="round">
            <button onChange={() => handleChange({ adj: !adj })} className="anim" />
          </div>
        </div>

        <div className="drop-section"> 

          <div> <p className="setting">Verbs</p>
          <p className="setting-desc">Description </p>
          
          </div>
    
          <div className="round">
            <button onChange={() => handleChange({ verb: !verb })} className="anim" />
          </div>
        </div>

        <div className="drop-section"> 

        <div> <p className="setting">Adverbs</p>
          <p className="setting-desc">Description </p>

          </div>

          <div className="round">
            <button onChange={() => handleChange({ adverb: !adverb })} className="anim" />
          </div>          
        </div>

        <div> <p className="setting">Selection Logic</p>

          <label>Word/Sentence</label><input type="checkbox" value="word" onChange={() => 
          {
            handleChange({ word: !word }); 
          }}/> 

          

        </div>      
    </div>
  );
}

export default App;

