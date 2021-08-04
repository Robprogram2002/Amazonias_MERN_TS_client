import Column from '@components/Layout/Containers/Column';
import { useFormikContext } from 'formik';
import InputField from '../Fields/InputField';
import SelectField from '../Fields/SelectField';

const ProductInventory = ({ menuKey }: { menuKey: string }) => {
  const { errors, touched } = useFormikContext<{
    basePrice: number;
    currency: string;
    sku: string;
    availability: string;
    stock: number;
    state: string;
    condition: string;
  }>();

  if (menuKey === 'inventory') {
    return (
      <Column>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            width: '100%',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '65% 35%',
              width: '100%',
              paddingRight: '2rem',
              columnGap: '0.5rem',
            }}
          >
            <InputField
              name="basePrice"
              error={!!(errors.basePrice && touched.basePrice)}
              label="Base Price"
              placeholder=""
              type="number"
            />
            <SelectField
              name="currency"
              error={!!(errors.currency && touched.currency)}
              label="Currency"
              loading={false}
              options={[
                { id: 'USD', name: 'USD' },
                { id: 'MXN', name: 'MXN' },
                { id: 'EUR', name: 'EUR' },
              ]}
            />
          </div>
          <InputField
            name="sku"
            error={!!(errors.sku && touched.sku)}
            label="Product SKU"
            placeholder="Type here ..."
            type="text"
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '47% 50%',
            width: '100%',
            marginBottom: '30px',
            columnGap: '1.4rem',
          }}
        >
          <SelectField
            name="availability"
            error={!!(errors.availability && touched.availability)}
            label="Availability"
            loading={false}
            options={[
              { id: 'in stock', name: 'in stock' },
              { id: 'out of stock', name: 'out of stock' },
              { id: 'pre-order', name: 'pre-order' },
              { id: 'backorder', name: 'backorder' },
            ]}
          />

          <InputField
            name="stock"
            error={!!(errors.stock && touched.stock)}
            label="Stock number"
            placeholder=""
            type="number"
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            columnGap: '.6rem',
          }}
        >
          <SelectField
            name="state"
            error={!!(errors.state && touched.state)}
            label="Product State"
            loading={false}
            options={[
              { id: 'active', name: 'active' },
              { id: 'not-active', name: 'not-active' },
              { id: 'other', name: 'other' },
            ]}
          />
          <SelectField
            name="condition"
            error={!!(errors.condition && touched.condition)}
            label="Product Condition"
            loading={false}
            options={[
              { id: 'new', name: 'new' },
              { id: 'used', name: 'used' },
              { id: 'repared', name: 'repared' },
              { id: 'refurbished', name: 'refurbished' },
            ]}
          />
        </div>
      </Column>
    );
  }
  return <div style={{ display: 'none' }} />;
};

export default ProductInventory;
