import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/Cart/cartSlice'
import counterSlice from '../features/CounterExample/counterSlice'
import accountSlice from '../features/Authentication/accountSlice'
import cartExampleSlice from '../features/CartExample/cartExampleSlice'

const reductRoot = {
    cart: cartSlice,
    counter: counterSlice,
    account: accountSlice,
    cartExample: cartExampleSlice,
}

export default configureStore({
    reducer: reductRoot
})