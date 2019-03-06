import styled from 'styled-components'

export const Main = styled.main`
  position: fixed;
  top: 5rem;
  bottom: 5rem;
  right: ${props => (props.open ? '-24rem' : '-5rem')};
  z-index: 2;
  width: 100%;
  height: calc(100vh - 10rem);
  transition: 0.3s;
  background: white;
`
