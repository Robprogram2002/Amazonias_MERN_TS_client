import { filterContext, filterSettersContext } from '@context/FilterContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import styles from '../FilterStore.module.scss';

const EntityTitle = ({
  name,
  handler,
  leftPadding,
}: {
  name: string;
  handler: () => void;
  leftPadding: boolean;
}) => (
  <div
    className={
      leftPadding
        ? `${styles.Department} ${styles.LeftSpace}`
        : styles.Department
    }
    onClick={handler}
    onKeyDown={handler}
    tabIndex={0}
    role="menuitem"
  >
    <RiArrowLeftSLine />
    <h4> {name} </h4>
  </div>
);

const ListItem = ({ name, handler }: { name: string; handler: () => void }) => (
  <span
    className={`${styles.ListItem} ${styles.LeftSpace}`}
    onClick={handler}
    onKeyDown={handler}
    tabIndex={0}
    role="menuitem"
  >
    {name}
  </span>
);

const FilterDepartments = () => {
  const { department, category, sub } = useContext(filterContext);
  const { setCategory, setSub, setInitialState } =
    useContext(filterSettersContext);
  const router = useRouter();

  const categoryBack = () => {
    setCategory(null);
    setSub(null);
  };

  const departmentBack = () => {
    router.push('/');
    setInitialState();
  };

  const subBack = () => setSub(null);

  return (
    <>
      {department && (
        <EntityTitle
          name={department.name}
          handler={departmentBack}
          leftPadding={false}
        />
      )}
      {category ? (
        <div className={styles.LeftSpace}>
          <EntityTitle
            name={category.name}
            handler={categoryBack}
            leftPadding={false}
          />

          {sub ? (
            <EntityTitle name={sub.name} handler={subBack} leftPadding />
          ) : (
            <div className={`${styles.OptionsList} ${styles.LeftSpace}`}>
              {category.subs.map((subElement) => (
                <ListItem
                  name={subElement.name}
                  handler={() => setSub(subElement)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.OptionsList}>
          {department?.categories.map((categoryElement) => (
            <ListItem
              name={categoryElement.name}
              handler={() => setCategory(categoryElement)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FilterDepartments;
