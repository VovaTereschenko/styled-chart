
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import './index.css';
import logo from './assets/logo.svg'
import * as React from 'react'
import styled from 'styled-components'
import BasicCharts from './sections/BasicCharts'

const Logo = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: auto;
`

const LogoImage = styled.img`
  display: flex;
  width: 72px;
  height: 72px;
  margin: 0 auto;
`

const LgooText = styled.p`
  display: flex;
  font-size: 28px;
  font-weight: 700;
  margin: 0 auto;
  letter-spacing: -1.2px;
`

const P = styled.p`
  margin: 16px auto;
  padding: 0 16px;
  font-size: 20px;
  font-weight: 500;
  color: #303030;
  text-align: center;
`


const Wrapper = styled.section`
  margin: 48px 16px 0;
`

const Buttongroup = styled.section`
  display: flex;
  margin: 16px auto;
  justify-content: center;
  width: 100%;
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
  &:hover {
    background: #6fb2f0;
  }
`

const ButtonSecondary = styled(ButtonPrimary)`
  background: #f6bac1;
  &:hover {
    background: #e7a8b0;
  }
`


const App = () =>
  <Wrapper>
    <Logo>
      <LogoImage src={logo} />
      <LgooText>Styled chart</LgooText>
    </Logo>
    <P>Create beautiful charts with 💅 styled components</P>
    <Buttongroup>
      <ButtonPrimary>Samples</ButtonPrimary>
      <ButtonSecondary>Docs</ButtonSecondary>
    </Buttongroup>
    <BasicCharts />
  </Wrapper> 

export default App









ReactDOM.render(<App />, document.getElementById('root'));