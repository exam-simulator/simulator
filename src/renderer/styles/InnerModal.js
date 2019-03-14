import styled from 'styled-components'
import { darken } from 'polished'

export const InnerModal = styled.div`
  width: 30vw;
  height: 25vh;
  display: grid;
  grid-template-rows: 3rem 1fr 5rem;
  background: white;
  box-shadow: ${props => props.theme.shadows[1]};
  .title {
    height: 3rem;
    display: flex;
    align-items: center;
    background: ${props => props.theme.primary};
    padding-left: 1rem;
    img {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.5rem;
    }
    span {
      font: 1.1rem 'Open Sans';
      font-weight: 600;
    }
  }
  .message {
    height: calc(25vh - 8rem);
    display: flex;
    align-items: center;
    justify-content: center;
    font: 1.3rem 'Open Sans';
    font-weight: 600;
    padding: 1rem;
  }
  .actions {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid ${props => props.theme.grey[2]};
    background: ${props => props.theme.grey[0]};
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      font: 1rem 'Open Sans';
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.75rem 1rem;
      margin-right: 1rem;
      border-radius: ${props => props.theme.borderRadius};
      transition: 0.3s;
      cursor: pointer;
    }
    .confirm {
      color: white;
      background: ${props => props.theme.secondary};
      &:hover {
        background: ${props => darken(0.1, props.theme.secondary)};
      }
    }
    .cancel {
      color: ${props => props.theme.grey[10]};
      background: ${props => props.theme.grey[1]};
      &:hover {
        background: ${props => props.theme.grey[2]};
      }
    }
  }
`
