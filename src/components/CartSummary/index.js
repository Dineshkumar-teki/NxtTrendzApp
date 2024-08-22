// Write your code here
import {Popup} from 'reactjs-popup'
import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

let intervalId
class CartSummary extends Component {
  state = {disableBtn: true, isOrderPlaced: ''}

  onChangePaymentMethod = event => {
    this.setState(prevState => ({disableBtn: !prevState.disableBtn}))
  }

  onClickConfirmOrder = () => {
    this.setState({isOrderPlaced: true})
    const {removeMethodCall} = this.props
    intervalId = setTimeout(removeMethodCall, 2000)
  }

  render() {
    const {disableBtn, isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const totalAmountList = cartList.map(
            eachItem => eachItem.price * eachItem.quantity,
          )
          const totalAmount = totalAmountList.reduce((sum, num) => sum + num)
          return (
            <div className="cartSummary">
              <h3>
                Order Total:{' '}
                <span className="totalAmount">{totalAmount}/-</span>
              </h3>
              <p>{cartList.length} items in Cart</p>
              <Popup
                trigger={<button className="checkOutBtn">CheckOut</button>}
                modal
              >
                {close => (
                  <div className="popup">
                    <h1 className="paymentsTitle">Payment Methods</h1>
                    <div className="eachpayment">
                      <input
                        type="radio"
                        id="Card"
                        value="Card"
                        name="paymentMethods"
                        onChange={this.onChangePaymentMethod}
                        disabled
                      />
                      <label htmlFor="Card">Card</label>
                      <img
                        className="paymentIcon"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-card-payment-icon-download-in-svg-png-gif-file-formats--credit-saas-pack-user-interface-icons-4559214.png?f=webp&w=256"
                        alt=""
                      />
                    </div>
                    <div className="eachpayment">
                      <input
                        type="radio"
                        id="NetBanking"
                        value="NetBanking"
                        name="paymentMethods"
                        onChange={this.onChangePaymentMethod}
                        disabled
                      />
                      <label htmlFor="NetBanking">Net Banking</label>
                      <img
                        className="paymentIcon"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-netbanking-icon-download-in-svg-png-gif-file-formats--credit-debit-card-bank-payment-methods-vol-2-pack-business-icons-32304.png?f=webp&w=256"
                      />
                    </div>
                    <div className="eachpayment">
                      <input
                        type="radio"
                        id="UPI"
                        value="UPI"
                        name="paymentMethods"
                        onChange={this.onChangePaymentMethod}
                        disabled
                      />
                      <label htmlFor="UPI">UPI</label>
                      <img
                        className="paymentIcon"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp&w=256"
                        alt=""
                      />
                    </div>
                    <div className="eachpayment">
                      <input
                        type="radio"
                        id="Wallet"
                        value="Wallet"
                        name="paymentMethods"
                        onChange={this.onChangePaymentMethod}
                        disabled
                      />
                      <label htmlFor="Wallet">Wallet</label>
                      <img
                        className="paymentIcon"
                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/wallet-3386924-2829737.png?f=webp&w=256"
                        alt=""
                      />
                    </div>
                    <div className="eachpayment">
                      <input
                        type="radio"
                        id="CashonDelivery"
                        value="CashonDelivery"
                        name="paymentMethods"
                        onChange={this.onChangePaymentMethod}
                      />
                      <label htmlFor="CashonDelivery">Cash on Delivery</label>
                      <img
                        className="paymentIcon"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-cash-on-delivery-icon-download-in-svg-png-gif-file-formats--payment-black-friday-pack-festival-days-icons-5829030.png?f=webp&w=256"
                        alt=""
                      />
                    </div>
                    <p className="cartlength">
                      <span>Number of Items: </span>
                      {cartList.length}
                    </p>
                    <p className="totalPrice">
                      <span>Total Price: </span>
                      {totalAmount}/-
                    </p>
                    <button
                      type="button"
                      className="ConfirmOrderBtn"
                      disabled={disableBtn}
                      onClick={this.onClickConfirmOrder}
                    >
                      Confirm Order
                    </button>
                    {isOrderPlaced ? (
                      <p className="orderSuccessMsg">
                        Your order has been placed successfully
                      </p>
                    ) : null}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
