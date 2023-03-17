import React from "react";
import { LeftMenu } from "../menu/leftMenu";
import { TopMenu } from "../menu/topMenu";

import './users.styles.scss';

export const Users = () => {

  return (
    <div>
      <TopMenu title="Users"/>
      <LeftMenu/>
    </div>
  )
  }