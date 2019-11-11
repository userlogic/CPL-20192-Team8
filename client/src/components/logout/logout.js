import React, { useEffect, useState, useContext} from 'react';
import {SessionContext, getSessionCookie, setSessionCookie } from '../../session';
import Cookies from 'js-cookie';

export default function Logout ({ history }) {
    useEffect(
      () => {
        Cookies.remove("session");
        history.push("/login");
      },
      [history]
    );
  
    return <div>Logging out!</div>;
  };
  