// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const len = cartList.length
      const total = cartList.map(each => each.quantity * each.price)
      return (
        <div className="summary-card">
          <h1 className="first-line">
            Order Total: <span className="amount">Rs {total}/-</span>
          </h1>
          <h1 className="second-line">{len} Items in cart</h1>
          <button type="button" className="checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
