import headerStyles from './Header.module.css';
import mealsJpg from '../../assets/meals.jpg';

import HeaderCartButton from './HeaderCartButton';

export default function Header(props) {
    return (
        <>
            <header className={headerStyles.header}>
                <h1>ReactMeals</h1>
                {/* <button>Cart</button> */}
                <HeaderCartButton />
            </header>
            <div className={headerStyles['main-image']}>
                <img src={mealsJpg} alt="A table with meals" />
            </div>
        </>
    );
}
