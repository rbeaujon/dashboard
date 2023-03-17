import React from "react";
import { LeftMenu } from "../menu/leftMenu";
import { TopMenu } from "../menu/topMenu";

import './games.styles.scss';

export const Games = () => {

  return (
    <div>
      <TopMenu title="Games"/>
      <LeftMenu/>
    </div>
  )
  }