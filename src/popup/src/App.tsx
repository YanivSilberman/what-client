import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import blue from '@material-ui/core/colors/blue';

import { Container, Header, Section, Title, Subtitle, FlexSection,
  ShowMoreSection, } from './styles';
import what_logo from './assets/logo.png';

interface User {
  active: boolean;
  freq: number;
  dif: number;
  noun: boolean;
  adjective: boolean;
  verb: boolean;
  adverb: boolean;
  word: boolean;
}

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
} as any);

const App: React.FC = () => {
  const [ showMore, setShowMore ] = useState(false);

  const [ user, setUser ] = useState<User>({
    active:true,
    freq:10,
    dif: 10, 
    noun: true,
    adjective:true,
    verb:true,
    adverb:true, 
    word:false
  });

  const handleChange = (change: Partial<typeof user>) => {
    setUser(oldUser => ({
      ...oldUser,
      ...change
    }))
  };

  useEffect(() => {
    chrome.storage.local.get(['user'], function(u) {
      handleChange({ ...u.user });
    })
  }, []);

  // put all of the variables into storage
  useEffect(() => {
    chrome.storage.local.set({"user":user});
  }, [ user ]);
  
  const {
    active,
    freq,
    dif, 
    noun,
    adjective,
    verb,
    adverb,
    word
  } = user;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <div>
            <img src={what_logo} />
            <p>Learn French while you surf!</p>
            <Switch
              onColor="#35b9e6"
              className="switch"
              onChange={ val => handleChange({ active: val }) }
              checked={active}
            />
          </div>
        </Header>

        <Section> 
          <div>
            <div> 
              <Title>Frequency</Title>
              <Subtitle>How often you'd like to see translations</Subtitle>
            </div>
            <Slider
              value={freq}
              onChange={(e, change) => handleChange({ freq: change as number })}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}

            />
          </div>
        </Section>

        <Section> 
          <div>
            <div> 
              <Title>Difficulty</Title>
              <Subtitle>How comfortable with French are you? </Subtitle>
            </div>
            <Slider
              value={dif}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}
              onChange={(e, val) => handleChange({ dif: val as number })}
            />
          </div>

        </Section>

        <ShowMoreSection showMore={ showMore }>
          <div className="content">
            <FlexSection> 
              <div>
                <div> 
                  <Title>Nouns</Title>
                  <Subtitle>People, places, or things</Subtitle>
                </div>
                <div className="round">
                  <Checkbox 
                    color="primary"
                    checked={ noun }
                    onChange={ e => handleChange({ noun: e.target.checked }) }
                  />
                </div>
              </div>
            </FlexSection>

            <FlexSection> 
              <div>
                <div> 
                  <Title>Adjectives</Title>
                  <Subtitle>Phrase naming an attribute, added to a noun</Subtitle>
                </div>
                <div className="round">
                  <Checkbox 
                    color="primary"
                    checked={ adjective }
                    onChange={ e => handleChange({ adjective: e.target.checked }) }
                  />
                </div>
              </div>
            </FlexSection>

            <FlexSection> 
              <div>
                <div>
                  <Title>Verbs</Title>
                  <Subtitle>Action, state, or occurrence</Subtitle>
                </div>
                <div className="round">
                  <Checkbox 
                    color="primary"
                    checked={ verb }
                    onChange={ e => handleChange({ verb: e.target.checked }) }
                  />
                </div>
              </div>
            </FlexSection>

            <FlexSection> 
              <div>
                <div> 
                  <Title>Adverbs</Title>
                  <Subtitle>Expressing a relation of place, time, circumstance, manner, cause, degree</Subtitle>
                </div>
                <div className="round">
                  <Checkbox 
                    color="primary"
                    checked={ adverb }
                    onChange={ e => handleChange({ adverb: e.target.checked }) }
                  />
                </div>
              </div>       
            </FlexSection>
          </div>
          <div className="link">
            <a onClick={() => setShowMore(!showMore)}>
              Show { showMore ? 'less' : 'more' }
            </a>
          </div>
        </ShowMoreSection>
      </Container>
    </ThemeProvider>
  );
}

/**
 * <div>
          <p className="setting">Selection Logic</p>
          <label>Word/Sentence</label><input type="checkbox" value="word" onChange={() => 
          {
            handleChange({ word: !word }); 
          }}/> 
        </div>
 * 
 */

export default App;

