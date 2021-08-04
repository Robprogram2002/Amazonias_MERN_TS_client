import Column from '@components/Layout/Containers/Column';
import { FieldArray, useFormikContext } from 'formik';
import InputField from '../Fields/InputField';

const ProductFeatures = ({ menuKey }: { menuKey: string }) => {
  const { values } = useFormikContext<{
    specifications: { name: string; value: string }[];
    features: string[];
  }>();

  if (menuKey === 'features') {
    return (
      <Column>
        <FieldArray
          name="specifications"
          render={(helpers) => (
            <div>
              <div
                style={{
                  display: 'flex',
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2> Important notes </h2>
                <button
                  type="button"
                  onClick={() => {
                    helpers.push({ name: '', value: '' });
                  }}
                >
                  Add One
                </button>
              </div>
              {values.specifications.map((spec, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '35% 62%',
                    width: '100%',
                    columnGap: '1rem',
                    marginBottom: '30px',
                  }}
                >
                  <InputField
                    name={`specifications[${index}].name`}
                    error={false}
                    label="Name"
                    placeholder="Type here ..."
                    type="text"
                  />
                  <InputField
                    name={`specifications[${index}].value`}
                    error={false}
                    label="Value"
                    placeholder="Type here ..."
                    type="text"
                  />
                </div>
              ))}
            </div>
          )}
        />

        <FieldArray
          name="features"
          render={(helpers) => (
            <div>
              <div
                style={{
                  display: 'flex',
                  width: '90%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2> Specifications about the product </h2>

                <button
                  type="button"
                  onClick={() => {
                    helpers.push({ name: '', value: '' });
                  }}
                >
                  Add One
                </button>
              </div>
              {values.features.map((feature, index) => (
                <InputField
                  name={`features[${index}]`}
                  error={false}
                  label=""
                  placeholder="Type here ..."
                  type="text"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                />
              ))}
            </div>
          )}
        />
      </Column>
    );
  }
  return <div style={{ display: 'none' }} />;
};

export default ProductFeatures;
