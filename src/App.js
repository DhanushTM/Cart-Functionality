import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
// import { uiActions } from "./components/store/ui-slice";
import { sendCartData, fetchCardData } from "./components/store/cart-actions";

let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCardData);
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Pending",
    //       title: "Sending...",
    //       message: "Sending Cart Data",
    //     })
    //   );
    //   const response = await fetch(
    //     "https://redux-76785-default-rtdb.firebaseio.com/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Sending cart data failed");
    //     // dispatch(
    //     //   uiActions.showNotification({
    //     //     status: "error",
    //     //     title: "Error",
    //     //     message: "Sending Cart Data Failed",
    //     //   })
    //     // );
    //   }
    //   // const responseData = await response.json();
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "Success",
    //       title: "Success!",
    //       message: "Sent Cart Data Successfully",
    //     })
    //   );
    // };
    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }
    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error",
    //       message: "Sending Cart Data Failed",
    //     })
    //   );
    // };
    // );
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
