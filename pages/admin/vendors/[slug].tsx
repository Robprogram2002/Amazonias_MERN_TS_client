import AdminMenu from '@components/Navigation/menus/AdminMenu';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { fetchVendorWithProducts } from '@api/products/vendors';
import VendorProfile from '@components/Layout/Cards/VendorProfile';

const VendorProfilePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data } = useQuery(
    ['fetch-vendor', slug],
    () => fetchVendorWithProducts(slug!),
    {
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <AdminMenu selectedKey="vendors" openKey="vendors/profile">
      {data && <VendorProfile vendor={data} />}

      {isLoading && <h1>Loading ...</h1>}

      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};

export default VendorProfilePage;
