import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)//references store.js to get the modal recuder, destructuring to get the is open function from the object. the object is in the modalSlice.js file
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems]) //this is updating the total in cart and the number on the bag icon in nav

  useEffect(() => {
    dispatch(getCartItems())
  },[])

  if(isLoading) {
    return(
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen &&
        <Modal />
      }
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App;
