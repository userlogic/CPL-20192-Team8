import React, { useEffect, useContext } from "react";
import { SessionContext } from "../../session";
import Cookies from "js-cookie";

export default function Logout(props) {
  const session = useContext(SessionContext);

  useEffect(() => {
    Cookies.remove("session");

    let s = session;
    if (s.id !== undefined) {
      delete s.id;
    }
    props.setSessionDown(s);

    props.history.push("/login");
  }, []);

  return <div>Logging out!</div>;
}
