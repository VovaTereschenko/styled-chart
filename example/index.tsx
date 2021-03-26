
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import './index.css';
import logo from './assets/logo.svg'
import * as React from 'react'
import styled from 'styled-components'
import BasicCharts from './sections/BasicCharts'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 16px auto;
  width: 100%;
`

const Logo = styled.div`
  display: flex;
  margin: 16px;
  align-items: center;
  justify-content: center;
  height: auto;
`

const LogoImage = styled.img`
  display: flex;
  width: 42px;
  height: 42px;
`

const LgooText = styled.p`
  display: flex;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -1.2px;
  margin: 0;
`

const H1 = styled.h1`
  margin: 32px auto 16px;
  max-width: 760px;
  padding: 0 16px;
  font-size: 52px;
  font-weight: 700;
  color: #000;
  text-align: center;
  span {
    display: block;

    &:before {
      font-weight: 400;
      content: '<💅>'
    }
    /* &:after {
      content: '>'
    } */
  }

  @media (max-width: 767px) {
    font-size: 32px;
  }
`

const H2 = styled.h2`
  margin: 0 auto 32px;
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 500;
  color: #303030;
  text-align: center;
`

const Wrapper = styled.section`
  margin: 16px auto 0;
  max-width: 1200px;
`

const Feedback = styled.section`
  text-align: center;
  margin: 48px 0 32px;
  padding-top: 16px;
  font-size: 14px;
  font-weight: 700;
  border-top: 2px solid #757575;
  div {
    margin: 8px auto 0;
    color: #414141;
    font-weight: 500;
  }
  a {
    color: #2f7cc3;
  }
`

const Buttongroup = styled.section`
  display: flex;
  margin:  16px;
  justify-content: flex-end;
`

const ButtonPrimary = styled.button`
  display: flex;
  height: 42px;
  line-height: 42px;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 16px;
  margin: 0 8px;
  color: #000;
  font-weight: 700;
  background: #86c4ff;
  outline: none;
  --webkit-appearance: none;
  border: none;
  cursor: pointer;
  transition: .2s all linear;
  box-shadow: 0px 2px #86c4ff96;
  &:hover {
    background: #6fb2f0;
  }
`

const ButtonSecondary = styled(ButtonPrimary)`
  text-decoration: none;
  background: linear-gradient(#9fd0ff, #f6bac1);
  box-shadow: 0px 2px #6fb2f0;
  &:hover {
    background: linear-gradient(#6eafec, #e7a5ad);
    box-shadow: 0px 4px #6fb2f0;
  }
`

const App = () =>
  <Wrapper>
    <Header>
      <Logo>
        <LogoImage src={logo} />
        <LgooText>Styled chart</LgooText>
      </Logo>
      <Buttongroup>
        <ButtonSecondary as="a" href="https://github.com/VovaTereschenko/styled-chart">Docs with samples</ButtonSecondary>
      </Buttongroup>
    </Header>
    
    <H1>Create beautiful charts with <span>styled components</span></H1>
    <H2>Chart lib for React.js built with TS and almost no dependencies</H2>
    <BasicCharts />

    <Feedback>
      <p>Contact developer</p>
      <div>
        email <a href="mailto:vovatdev@gmail.com">vovatdev@gmail.com</a>
      </div>
      <div>hash for twitter #styled-chart</div>
    </Feedback>
  </Wrapper> 

export default App

ReactDOM.render(<App />, document.getElementById('root'));