/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../assets/DinagramLogo.png';
import TEST_DATA from '../dev/testData.json';
import AddTaskButton from './AddTaskButton'
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';



import "!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css"; 

class Dinagram extends Component {
  render() {
    return (
      <App className="dinagram-app">
        <Article>
          <Header
            size="small"
          >
            <Image
              src={logo}
              className="App-logo"
              alt="dinagram logo"
              size="small"
            />
            <Heading
              size="small"
              align="center"
              strong
              tag="h1"
            >
              Making the most of your free time
            </Heading>
          </Header>
        <Section
          align="center"
          
        >
          <AddTaskButton/>
        </Section>
      </Article>
      </App>
    );
  }
} 

export default Dinagram;
