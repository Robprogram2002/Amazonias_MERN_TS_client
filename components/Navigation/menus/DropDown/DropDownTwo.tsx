import { filterSettersContext } from '@context/FilterContext';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiArrowRightSLine } from 'react-icons/ri';
import { CategorySubs } from '../../../../types/Category';
import { DepartmentsMenu } from '../../../../types/Department';
import styles from './DropDownTwo.module.scss';

const DropDownTwo = ({ data }: { data: DepartmentsMenu[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentsMenu | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategorySubs | null>(
    null
  );

  const { setDepartment, setCategory, setSub } =
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
                  onMouseEnter={() => {
                    setSelectedDepartment(department);
                    setSelectedCategory(null);
                  }}
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
          {selectedDepartment && (
            <div className={styles.CategoryList}>
              <h3> {selectedDepartment?.name} </h3>

              {selectedDepartment &&
                selectedDepartment.categories.map((category) => (
                  <span
                    className={styles.CategoryItem}
                    key={category._id}
                    onMouseEnter={() => setSelectedCategory(category)}
                    onClick={() =>
                      setFilterCategory(category, selectedDepartment)
                    }
                    onKeyDown={() =>
                      setFilterCategory(category, selectedDepartment)
                    }
                    tabIndex={0}
                    role="menuitem"
                  >
                    {category.name}
                    <RiArrowRightSLine />
                  </span>
                ))}
            </div>
          )}

          {selectedDepartment && (
            <div className={styles.BigBanner}>
              <img
                src={selectedDepartment.banners[0].url}
                alt="ajksndjs sajdjk"
              />
            </div>
          )}

          {selectedCategory && (
            <div className={styles.BannersContainer}>
              {selectedCategory.banners.map((banner) => (
                <div className={styles.Banner} key={banner.publicId}>
                  <img src={banner.url} alt="ajksndjs sajdjk" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDownTwo;
