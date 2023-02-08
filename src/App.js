import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const check = cartList.filter(each => id === each.id)
    if (check.length !== 0) {
      const index = cartList.findIndex(element => element.id === check[0].id)
      cartList[index].quantity += 1
      this.setState({cartList})
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const check = cartList.filter(each => id === each.id)
    if (check.length !== 0) {
      const index = cartList.findIndex(element => element.id === check[0].id)
      cartList[index].quantity -= 1
      if (cartList[index].quantity < 0) {
        cartList[index].quantity = 0
      }
      this.setState({cartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== id)
    this.setState({cartList: newList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const check = cartList.filter(each => product.id === each.id)
    if (check.length !== 0) {
      const index = cartList.findIndex(element => element.id === check[0].id)
      cartList[index].quantity += product.quantity
      this.setState({cartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
