import { type FC } from "react";

export const CollapseButton:FC<{
  isExpanded: boolean;
  onClick: () => void;
}> = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        [
          "collapse-button",
          ...(isExpanded ? ["expanded"] : [])
        ].join(" ")
      }
    >
      ▶
    </button>
  );
};
