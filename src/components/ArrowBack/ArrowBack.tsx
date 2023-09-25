import React from "react";
import { Link } from "react-router-dom";
import iconArrow from "./img/icon-arrow.svg";

interface BackButtonProps {
  link: string;
}

const BackButton: React.FC<BackButtonProps> = ({ link }) => {
  return (
    <div>
      <Link to={link}>
        <button>
          <img src={iconArrow} />
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
