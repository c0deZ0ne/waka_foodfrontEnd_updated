import { Fragment, useEffect } from "react";
import PopAlert from "../components/Alert";
import PreLoader from "../components/PreLoader";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../actions/foods";
import { GET_CATEGORIES } from "../actions/types";
import { showError } from "../actions/alerts";

const Layout = (props) => {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories(auth.kitchenId);
      if (response === "error") {
        dispatch(showError("Problem loading categories"));
      } else {
        dispatch({
          type: GET_CATEGORIES,
          payload: response,
        });
      }
    };
    fetchCategories();
  }, []);

  return (
    <Fragment>
      {page.loading && <PreLoader />}
      <PopAlert />
      {props.children}
    </Fragment>
  );
};

export default Layout;
