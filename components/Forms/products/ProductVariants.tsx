import { Variant } from '@api/products/products';
import Column from '@components/Layout/Containers/Column';
import { FieldArray, useFormikContext } from 'formik';
import { ReactElement } from 'react';
import ImageUploadVariant from '../Fields/ImageUploadVariant';
import InputField from '../Fields/InputField';
import SelectField from '../Fields/SelectField';

const VariantForm = ({
  options,
  index,
}: {
  options: string[];
  index: number;
}) => (
  <>
    <Column key={`Options : ${options[0]} ${options[1]}`}>
      <h2> {`Options : ${options[0]} ${options[1]}`} </h2>

      <ImageUploadVariant label="Variant images" index={index} />

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
            name={`productVariants[${index}].basePrice`}
            error={false}
            label="Base Price"
            placeholder=""
            type="number"
          />
          <SelectField
            name={`productVariants[${index}].currency`}
            error={false}
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
          name={`productVariants[${index}].sku`}
          error={false}
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
          name={`productVariants[${index}].availability`}
          error={false}
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
          name={`productVariants[${index}].stock`}
          error={false}
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
          name={`productVariants[${index}].state`}
          error={false}
          label="Product State"
          loading={false}
          options={[
            { id: 'active', name: 'active' },
            { id: 'not-active', name: 'not-active' },
            { id: 'other', name: 'other' },
          ]}
        />
        <SelectField
          name={`productVariants[${index}].condition`}
          error={false}
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
    <hr style={{ color: 'black', height: '1px', width: '100%' }} />
  </>
);

const ProductVariants = ({ menuKey }: { menuKey: string }) => {
  const {
    values: { variants },
  } = useFormikContext<{
    variants: { name: string; options: string[] }[];
    productVariants: Variant[];
  }>();

  if (menuKey === 'variants') {
    return (
      <Column>
        <FieldArray
          name="productVariants"
          render={() => {
            if (variants.length === 1) {
              return variants[0].options.map((option) => <h1> {option} </h1>);
            }
            if (variants.length === 2) {
              const forms: ReactElement<any, any>[] = [];
              let count = 0;

              variants[0].options.forEach((optionOne) =>
                variants[1].options.forEach((optionTwo) => {
                  forms.push(
                    <VariantForm
                      options={[optionOne, optionTwo]}
                      index={count}
                    />
                  );
                  count += 1;
                })
              );
              return forms;
            }

            return <h1>There is not variant yet</h1>;
          }}
        />
      </Column>
    );
  }
  return <div style={{ display: 'none' }} />;
};

export default ProductVariants;
