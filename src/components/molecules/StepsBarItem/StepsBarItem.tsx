import React, { FC } from "react";
import * as Styled from "./styles";

export type StepsBarItemProps = {
  index?: number;
  label?: string;
  step?: number;
  isCompleted?: boolean;
};

export const StepsBarItem: FC<StepsBarItemProps> = ({
  index = 0,
  label,
  isCompleted,
}) => {
  return (
    <Styled.StepsBarItem isCompleted={isCompleted}>
      <span>{index + 1}</span>
      <p>{label}</p>
    </Styled.StepsBarItem>
  );
};
