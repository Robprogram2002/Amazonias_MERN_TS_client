import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiArrowRightSLine } from 'react-icons/ri';
import { ISubCategory } from '../../../../types/SubCategory';
import { DepartmentsMenu } from '../../../../types/Department';
import { filterSettersContext } from '../../../../context/FilterContext';
import styles from './DropDown.module.scss';
import { CategorySubs } from '../../../../types/Category';

const DropDown = ({ data }: { data: DepartmentsMenu[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentsMenu | null>(null);
  const { setCategory, setDepartment, setSub } =
    useContext(filterSettersContext);
  const router = useRouter();

  const setFilterDepartment = (department: DepartmentsMenu) => {
    setDepartment(department);
    setCategory(null);
    setSub(null);
    router.push('/store');
  };

  const setFilterCategory = (
    category: CategorySubs,
    department: DepartmentsMenu
  ) => {
    setDepartment(department);
    setCategory(category);
    setSub(null);
    router.push('/store');
  };

  const setFilterSub = (
    sub: ISubCategory,
    category: CategorySubs,
    department: DepartmentsMenu
  ) => {
    setDepartment(department);
    setCategory(category);
    setSub(sub);
    router.push('/store');
  };

  return (
    <>
      <div
        className={styles.TextContent}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={() => setIsOpen((prev) => !prev)}
        role="menu"
        tabIndex={0}
      >
        <span>All the </span>
        <strong>
          Departments <IoMdArrowDropdown />{' '}
        </strong>
        <div
          className={styles.DropDownContainer}
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          <div className={styles.DepartmentList}>
            {data &&
              data.map((department) => (
                <span
                  className={
                    selectedDepartment?._id === department._id
                      ? styles.DepartmentItemActive
                      : styles.DepartmentItem
                  }
                  key={department._id}
                  onMouseEnter={() => setSelectedDepartment(department)}
                  onClick={() => setFilterDepartment(department)}
                  onKeyDown={() => setFilterDepartment(department)}
                  tabIndex={0}
                  role="menuitem"
                >
                  {department.name}
                  <RiArrowRightSLine />
                </span>
              ))}
          </div>
          <div
            className={styles.CategoriesContainer}
            style={{ display: selectedDepartment ? 'block' : 'none' }}
          >
            <div className={styles.CategoryList}>
              {selectedDepartment?.categories.map((category) => (
                <div className={styles.CategoryItem} key={category._id}>
                  <div
                    onClick={() =>
                      setFilterCategory(category, selectedDepartment)
                    }
                    onKeyDown={() =>
                      setFilterCategory(category, selectedDepartment)
                    }
                    tabIndex={0}
                    role="menuitem"
                  >
                    <h3>{category.name}</h3>
                  </div>
                  <div className={styles.SubList}>
                    {category.subs.map((sub) => (
                      <span
                        key={sub._id}
                        onClick={() =>
                          setFilterSub(sub, category, selectedDepartment)
                        }
                        onKeyDown={() =>
                          setFilterSub(sub, category, selectedDepartment)
                        }
                        tabIndex={0}
                        role="menuitem"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.ImgContainer}>
              <img src={selectedDepartment?.banners[0].url} alt="asndjkasjdj" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
