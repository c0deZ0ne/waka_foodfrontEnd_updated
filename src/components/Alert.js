import { Fragment, useEffect, useState } from "react";
import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_ALERT } from "../actions/types";

const PopAlert = () => {
  const dispatch = useDispatch();
  //  Getting states....
  const alert = useSelector((state) => state.alert);
  //   const [showAlert, setshowAlert] = useState(true);
  //   useEffect(() => {
  //     if (alert.success) {
  //       setshowAlert(true);
  //       console.log("Ok");
  //     }
  //   }, []);
  const closeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
      // payload: { id },
    });
  };

  // If alert is not manually closed, close it after 5seconds 
  if(alert.success || alert.error ){
    setTimeout(() => {
      closeAlert()
    }, 5000);
  }

  return (
    <Fragment>
      <div className="alert_position">
        {alert.success && (
          <Alert
            message={`${alert.message}`}
            type="success"
            showIcon
            closable
            afterClose={() => closeAlert()}
          />
        )}
        {alert.error && (
          <Alert
            message={`${alert.message}`}
            type="error"
            showIcon
            closable
            afterClose={() => closeAlert()}
          />
        )}
      </div>
    </Fragment>
  );
};

export default PopAlert;
