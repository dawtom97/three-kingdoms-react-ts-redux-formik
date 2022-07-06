import styled from 'styled-components';
import { HeroCardProps } from './StartPage';


export const Container = styled.main`
  width:100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const InnerWrapper = styled.div`
  max-width: 1444px;
  padding: 25px;
`

export const HeroesBox = styled.div`
  display: flex;
  gap:20px;
  & input[type='radio'] {display:none}

`

export const HeroCard = styled.div<HeroCardProps>`
  background-image: url(${({ avatar }) => avatar});
  background-size: cover;
  min-width:400px;
  min-height: 600px;
  border-radius: 15px;
  padding: 25px;
  cursor: pointer;

`

export const StepsBar = styled.div`
   display: flex;
   position: relative;
   justify-content: space-between;
   width: 100%;
   &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    width: 100%;
    height: 3px;
    background-color: red;
   }
`

type StepsBarItemProps = {
    isCompleted:boolean
};

export const StepsBarItem = styled.span<StepsBarItemProps>`
       border-radius: 50%;
    width:30px;
    text-align: center;
    line-height: 30px;
    z-index: 1;
    height: 30px;
    background-color: ${({isCompleted})=> isCompleted ? 'gold' : 'red'};
`