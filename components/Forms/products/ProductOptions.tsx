import Column from '@components/Layout/Containers/Column';
import { FieldArray, useFormikContext } from 'formik';
import { Select } from 'antd';
import InputField from '../Fields/InputField';

const ProductOptions = ({ menuKey }: { menuKey: string }) => {
  const {
    values: { variants },
    setFieldValue,
  } = useFormikContext<{
    variants: { name: string; options: string[] }[];
  }>();

  function handleChange(value: any, index: number) {
    const newArray = [...variants];
    newArray[index].options = value;
    setFieldValue('variants', newArray);
  }

  if (menuKey === 'options') {
    return (
      <Column>
        <FieldArray
          name="variants"
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
                <h2> Create Product Variants </h2>
                <button
                  type="button"
                  onClick={() => {
                    helpers.push({ name: '', options: [] });
                  }}
                >
                  Add One
                </button>
              </div>
              <div style={{ height: '30px' }} />
              {variants.map((spec, index) => (
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
                    name={`variants[${index}].name`}
                    error={false}
                    label="Name"
                    placeholder="Type here ..."
                    type="text"
                  />
                  <div>
                    <h3> Options </h3>
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="type options ..."
                      onChange={(value: string) => handleChange(value, index)}
                      size="large"
                      value={`${spec.options}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </Column>
    );
  }
  return <div style={{ display: 'none' }} />;
};

export default ProductOptions;
