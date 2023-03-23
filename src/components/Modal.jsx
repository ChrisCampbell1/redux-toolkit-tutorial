import { clearCart } from "../features/cart/cartSlice"
import { closeModal } from "../features/modal/modalSlice"
import { useDispatch } from "react-redux"


export default function Modal() {
  const dispatch = useDispatch()
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from your cart?</h4>
        <div className="btn-container">
          <button type="button" className="btn confirm-btn" onClick={() => {
            dispatch(clearCart())
            dispatch(closeModal())
          }}>
            confirm
          </button>
          <button type="button" className="btn clear-btn" onClick={() => {dispatch(closeModal())}}>
            cancel
          </button>
        </div>
      </div>
    </aside>
  )
}
