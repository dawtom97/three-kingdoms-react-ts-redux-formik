import styled from "styled-components";
import { StepsBarItemProps } from "./StepsBarItem";

export const StepsBarItem = styled.div<StepsBarItemProps>`
    border-radius: 50%;
    width:30px;
    text-align: center;
    line-height: 30px;
    z-index: 1;
    height: 30px;
    background-color: ${({isCompleted})=> isCompleted ? 'gold' : 'red'};
    & > p {
        color: ${({isCompleted})=> isCompleted ? 'gold' : 'red'};
    }
`

