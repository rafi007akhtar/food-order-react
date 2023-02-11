import buttonStyles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

export default function HeaderCartButton(props) {
    return (
        <button className={buttonStyles.button}>
            <span className={buttonStyles.icon}> <CartIcon /> </span>
            <span>Your Cart</span>
            <span className={buttonStyles.badge}> 0 </span>
        </button>
    );
}
