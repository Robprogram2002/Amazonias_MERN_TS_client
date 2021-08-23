import { useContext, useEffect } from 'react';
import CheckOutMenu from '@components/Navigation/menus/CheckOutMenu';
import { checkOutContext, checkOutSections } from '@context/CheckOutContext';
import { useRouter } from 'next/router';
import { cartContext } from '@context/CartContext';

const CheckOutPage = () => {
  const { cart } = useContext(cartContext);
  const { setState } = useContext(checkOutContext);
  const router = useRouter();
  const section = router.query.section as string | null;

  if (!section) {
    return <h2>Loading ....</h2>;
  }

  useEffect(() => {
    if (cart.products.length <= 0) {
      router.push('/');
    }

    const checkoutState = localStorage.getItem('amazonias_checkout');
    if (checkoutState) {
      setState(JSON.parse(checkoutState));
    } else {
      router.push(`/user/checkout/${checkOutSections[0].title}`);
    }
  }, []);

  const { component } = checkOutSections.filter(
    ({ title }) => title.toString() === section.toString()
  )[0];

  return <CheckOutMenu>{component}</CheckOutMenu>;
};

export default CheckOutPage;
