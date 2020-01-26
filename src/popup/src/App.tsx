import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import Frame, { FrameContextConsumer } from 'react-frame-component';

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
}

const b = {
  "50":"#e3f2fd",
  "100":"#bbdefb",
  "200":"#90caf9",
  "300":"#64b5f6",
  "400":"#35b9e6",
  "500":"#35b9e6",
  "600":"#35b9e6",
  "700":"#35b9e6",
  "800":"#35b9e6",
  "900":"#35b9e6",
  "A100":"#35b9e6",
  "A200":"#35b9e6",
  "A400":"#35b9e6",
  "A700":"#35b9e6"
}

const theme = createMuiTheme({
  palette: {
    primary: b
  }
} as any);

const App: React.FC = () => {
  const [ showMore, setShowMore ] = useState(false);

  const [ user, setUser ] = useState<User>({
    active:true,
    freq:10,
    dif: 1, 
    noun: true,
    adjective:true,
    verb:true,
    adverb:true
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
    chrome.storage.local.set({"user": user});
  }, [ user ]);
  
  const {
    active,
    freq,
    dif, 
    noun,
    adjective,
    verb,
    adverb
  } = user;

  const diffMessage = [
    'Easy vocabulary',
    'Intermediate vocabulary',
    'Hard vocabulary',
    'Full sentences'
  ][dif - 1];

  const extendedShowMore = showMore && dif !== 4;

  return (
    <ThemeProvider theme={theme}>
            <Container>
              <Header>
                <div>
                  <img src={what_logo} />
                  <p>
                    <h4>Learn french</h4>
                    <h4>while you surf</h4>
                  </p>
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
                    <Title>Difficulty</Title>
                    <Subtitle>{diffMessage}</Subtitle>
                  </div>
                  <div>
                    <Slider
                      value={dif}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={1}
                      max={4}
                      onChange={(e, val) => handleChange({ dif: val as number })}
                      disabled={ !active }
                    />
                  </div>
                </div>
              </Section>

              <Section> 
                <div>
                  <div> 
                    <Title>Density</Title>
                    <Subtitle>Frequency of translations</Subtitle>
                  </div>
                  <div>
                    <Slider
                      value={freq}
                      onChange={(e, change) => handleChange({ freq: change as number })}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={10}
                      max={70}
                      disabled={ !active }
                    />
                  </div>
                </div>
              </Section>

              <ShowMoreSection showMore={ extendedShowMore }>
                <div className="content">
                  <FlexSection> 
                    <div>
                      <div> 
                        <Title options>Nouns</Title>
                        <Subtitle options>Enrich your vocabulary</Subtitle>
                      </div>
                      <div className="round">
                        <Checkbox 
                          color="primary"
                          checked={ noun }
                          onChange={ e => handleChange({ noun: e.target.checked }) }
                          disabled={ !active }
                        />
                      </div>
                    </div>
                  </FlexSection>

                  <FlexSection> 
                    <div>
                      <div> 
                        <Title options>Adjectives</Title>
                        <Subtitle options>Improve sentence formulation</Subtitle>
                      </div>
                      <div className="round">
                        <Checkbox 
                          color="primary"
                          checked={ adjective }
                          onChange={ e => handleChange({ adjective: e.target.checked }) }
                          disabled={ !active }
                        />
                      </div>
                    </div>
                  </FlexSection>

                  <FlexSection> 
                    <div>
                      <div>
                        <Title options>Verbs</Title>
                        <Subtitle options>Practice your conjugations</Subtitle>
                      </div>
                      <div className="round">
                        <Checkbox 
                          color="primary"
                          checked={ verb }
                          onChange={ e => handleChange({ verb: e.target.checked }) }
                          disabled={ !active }
                        />
                      </div>
                    </div>
                  </FlexSection>

                  <FlexSection> 
                    <div>
                      <div> 
                        <Title options>Adverbs</Title>
                        <Subtitle options>Perfection is in the detail</Subtitle>
                      </div>
                      <div className="round">
                        <Checkbox 
                          color="primary"
                          checked={ adverb }
                          onChange={ e => handleChange({ adverb: e.target.checked }) }
                          disabled={ !active }
                        />
                      </div>
                    </div>       
                  </FlexSection>
                </div>
                { dif !== 4 && (
                  <div className="link">
                    <a href="#" onClick={() => setShowMore(!showMore)}>
                      Show { showMore ? 'less' : 'more' }
                    </a>
                  </div>
                ) }
              </ShowMoreSection>
            </Container>
          </ThemeProvider>
  );
}

export default App;

