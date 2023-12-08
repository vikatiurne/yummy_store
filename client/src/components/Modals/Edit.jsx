import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuClipboardEdit, LuDelete } from 'react-icons/lu';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../UI/Modal/Modal';
import EditCategoryName from '../EditCategoryName.jsx/EditCategoryName';
import EditSubcategoryName from '../EditSubcategoryName.jsx/EditSubcategoryName';
import AddCategory from '../AddCategory/AddCategory';
import AddSubcategory from '../AddSubcategory/AddSubcategory';

import {
  fetchDelCategory,
  fetchDelSubcategory,
  isClickAdd,
  isClickAddSubcat,
  isClickEdit,
  isClickEditSubcat,
} from '../../pages/Admin/AdminSlice';
import {
  fetchGetCategory,
  fetchGetSubcategory,
} from '../../pages/Home/HomeSlice';
import {
  fetchGetCategoryById,
  fetchGetSubcategoryById,
} from '../../pages/Prodact/ProdactSlice';

import styles from './Modals.module.css';

const Edit = ({ active, setActive }) => {
  const [subcategoryVisible, setSubcategoryVisible] = useState(false);
  const [subcategoryVisibleId, setSubcategoryVisibleId] = useState(null);

  const categories = useSelector((state) => state.home.category);
  const subcategories = useSelector((state) => state.home.subcategory);
  const isDel = useSelector((state) => state.admin.isDelete);
  const isUpdate = useSelector((state) => state.admin.isUpdate);
  const isAdd = useSelector((state) => state.admin.isAdd);
  const isEdit = useSelector((state) => state.admin.clickEdit);
  const editId = useSelector((state) => state.admin.editId);
  const isEditSubcat = useSelector((state) => state.admin.clickEditSubcat);
  const editSubcatId = useSelector((state) => state.admin.editSubcatId);
  const clickAdd = useSelector((state) => state.admin.clickAdd);
  const clickAddSubcat = useSelector((state) => state.admin.clickAddSubcat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDel || isUpdate || isAdd) {
      dispatch(fetchGetCategory());
      dispatch(fetchGetSubcategory());
    }
  }, [dispatch, isDel, isUpdate, isAdd]);

  const toggleSubcategoryVisible = (id) => {
    setSubcategoryVisibleId(id);
    setSubcategoryVisible((prev) => !prev);
  };

  const delCategoryHandler = (id) => {
    dispatch(fetchDelCategory({ id }));
  };

  const editCategoryHandler = async (id) => {
    await dispatch(fetchGetCategoryById({ id }));
    dispatch(isClickEdit({ id, isEdit: true }));
  };

  const delSubcategoryHandler = (id) => {
    dispatch(fetchDelSubcategory({ id }));
  };

  const editSubcategoryHandler = async (id) => {
    await dispatch(fetchGetSubcategoryById({ id }));
    dispatch(isClickEditSubcat({ id, isEditSubcat: true }));
  };

  const addCategoryHandler = () => {
    dispatch(isClickAdd(true));
  };

  const addSubategoryHandler = (id) => {
    dispatch(isClickAddSubcat(true));
    dispatch(isClickEdit({ id }));
  };

  return (
    <Modal active={active} setActive={setActive}>
      <ul className={styles.catList}>
        {categories.map((cat) => (
          <div className={styles.edit} key={uuidv4()}>
            <li>
              <div className={styles.editPanel}>
                <LuDelete
                  className={styles.iconBin}
                  onClick={() => delCategoryHandler(cat.id)}
                />
                {!isEdit ? (
                  <>
                    <p onClick={() => toggleSubcategoryVisible(cat.id)}>
                      {cat.name}
                    </p>
                    <LuClipboardEdit
                      className={styles.iconEdit}
                      onClick={() => editCategoryHandler(cat.id)}
                    />
                  </>
                ) : editId === cat.id ? (
                  <EditCategoryName id={cat.id} />
                ) : (
                  <>
                    <p>{cat.name}</p>
                    <LuClipboardEdit
                      className={styles.iconEdit}
                      onClick={() => editCategoryHandler(cat.id)}
                    />
                  </>
                )}
              </div>
              {subcategoryVisible &&
                (subcategoryVisibleId === cat.id ? (
                  <ol className={styles.subcatList}>
                    {subcategories
                      .filter((subcat) => subcat.categoryId === cat.id)
                      .map((item) => (
                        <li key={uuidv4()}>
                          <div className={styles.editPanel}>
                            <LuDelete
                              className={styles.iconBin}
                              onClick={() => delSubcategoryHandler(item.id)}
                            />
                            {!isEditSubcat ? (
                              <>
                                <p>{item.name}</p>
                                <LuClipboardEdit
                                  className={styles.iconEdit}
                                  onClick={() =>
                                    editSubcategoryHandler(item.id)
                                  }
                                />
                              </>
                            ) : editSubcatId === item.id ? (
                              <EditSubcategoryName id={item.id} />
                            ) : (
                              <>
                                <p>{item.name}</p>
                                <LuClipboardEdit
                                  className={styles.iconEdit}
                                  onClick={() =>
                                    editSubcategoryHandler(item.id)
                                  }
                                />
                              </>
                            )}
                          </div>
                        </li>
                      ))}

                    {!clickAddSubcat ? (
                      <div
                        className={styles.add}
                        onClick={() => addSubategoryHandler(cat.id)}
                      >
                        <MdOutlineLibraryAdd />
                        <p>підкатегорію</p>
                      </div>
                    ) : editId === cat.id ? (
                      <AddSubcategory categoryId={cat.id} />
                    ) : (
                      <div
                        className={styles.add}
                        onClick={() => addSubategoryHandler(cat.id)}
                      >
                        <MdOutlineLibraryAdd />
                        <p>підкатегорію</p>
                      </div>
                    )}
                  </ol>
                ) : null)}
            </li>
          </div>
        ))}
        {!clickAdd ? (
          <div className={styles.add} onClick={addCategoryHandler}>
            <MdOutlineLibraryAdd />
            <p>категорію</p>
          </div>
        ) : (
          <AddCategory />
        )}
      </ul>
    </Modal>
  );
};

export default Edit;
