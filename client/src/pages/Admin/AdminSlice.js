import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CreateServices from '../../services/CreateServices';
import DeleteServices from '../../services/DeleteService';
import UpdateServices from '../../services/UpdateService';

const initialState = {
  status: 'idle',
  error: null,
  // category: '',
  // subcategory: '',
  prodact: [],
  isDelete: false,
  isUpdate: false,
  isAdd: false,
  clickEdit: false,
  clickEditSubcat: false,
  editId: null,
  editSubcatId: null,
  clickAdd: false,
  clickAddSubcat: false,
};

export const fetchCreateCategory = createAsyncThunk(
  'admin/fetchCreateCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      return await CreateServices.createCategory(name);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreateSubcategory = createAsyncThunk(
  'admin/fetchCreateSubcategory',
  async ({ name, categoryId }, { rejectWithValue }) => {
    try {
      return await CreateServices.createSubcategory(name, categoryId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCreateProdact = createAsyncThunk(
  'admin/fetchCreateProdact',
  async (formData, { rejectWithValue }) => {
    try {
      return await CreateServices.createProdact(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDeleteProdact = createAsyncThunk(
  'admin/fetchDeleteProdact',
  async (id, { rejectWithValue }) => {
    try {
      return await DeleteServices.delete(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDelCategory = createAsyncThunk(
  'admin/fetchDelCategory',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await DeleteServices.deleteCategory(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchDelSubcategory = createAsyncThunk(
  'admin/fetchDelSubcategory',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await DeleteServices.deleteSubcategory(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdateProdact = createAsyncThunk(
  'admin/fetchUpdateProdact',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await UpdateServices.update(id, formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchUpdateCategory = createAsyncThunk(
  'admin/fetchUpdateCategory',
  async ({ id, categoryName }, { rejectWithValue }) => {
    try {
      return await UpdateServices.updateCategory(id, categoryName);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchUpdateSubcategory = createAsyncThunk(
  'admin/fetchUpdateSubcategory',
  async ({ id, subcategoryName }, { rejectWithValue }) => {
    try {
      return await UpdateServices.updateSubcategory(id, subcategoryName);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    isClickEdit(state, { payload }) {
      state.editId = payload.id;
      state.clickEdit = payload.isEdit;
    },
    isClickEditSubcat(state, { payload }) {
      state.clickEditSubcat = payload.isEditSubcat;
      state.editSubcatId = payload.id;
    },
    isClickAdd(state, { payload }) {
      state.clickAdd = payload;
    },
    isClickAddSubcat(state, { payload }) {
      state.clickAddSubcat = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCreateCategory.pending, (state) => {
        state.status = 'loading';
        state.isAdd = false;
      })
      .addCase(fetchCreateCategory.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.status = 'success';
        state.error = null;
        // state.category = payload;
        state.isAdd = true;
      })
      .addCase(fetchCreateCategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchCreateSubcategory.pending, (state) => {
        state.status = 'loading';
        state.isAdd = false
      })
      .addCase(fetchCreateSubcategory.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.error = null;
        state.isAdd = true
        // state.subcategory = payload;
      })
      .addCase(fetchCreateSubcategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchCreateProdact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.error = null;
        state.prodact.push(payload);
      })
      .addCase(fetchCreateProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchDeleteProdact.pending, (state) => {
        state.status = 'loading';
        state.isDelete = false;
      })
      .addCase(fetchDeleteProdact.fulfilled, (state) => {
        state.status = 'success';
        state.isDelete = true;
      })
      .addCase(fetchDeleteProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchUpdateProdact.pending, (state) => {
        state.status = 'loading';
        state.isUpdate = false;
      })
      .addCase(fetchUpdateProdact.fulfilled, (state) => {
        state.status = 'success';
        state.isUpdate = true;
      })
      .addCase(fetchUpdateProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchDelCategory.pending, (state) => {
        state.status = 'loading';
        state.isDelete = false;
      })
      .addCase(fetchDelCategory.fulfilled, (state) => {
        state.status = 'success';
        state.isDelete = true;
      })
      .addCase(fetchDelCategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchUpdateCategory.pending, (state) => {
        state.status = 'loading';
        state.isUpdate = false;
      })
      .addCase(fetchUpdateCategory.fulfilled, (state) => {
        state.status = 'success';
        state.isUpdate = true;
      })
      .addCase(fetchUpdateCategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchDelSubcategory.pending, (state) => {
        state.status = 'loading';
        state.isDelete = false;
      })
      .addCase(fetchDelSubcategory.fulfilled, (state) => {
        state.status = 'success';
        state.isDelete = true;
      })
      .addCase(fetchDelSubcategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      })
      .addCase(fetchUpdateSubcategory.pending, (state) => {
        state.status = 'loading';
        state.isUpdate = false;
      })
      .addCase(fetchUpdateSubcategory.fulfilled, (state) => {
        state.status = 'success';
        state.isUpdate = true;
      })
      .addCase(fetchUpdateSubcategory.rejected, (state, { payload }) => {
        state.status = 'error';
        state.error = payload.message;
      });
  },
});

export const { isClickEdit, isClickEditSubcat, isClickAdd,isClickAddSubcat } =
  AdminSlice.actions;
export default AdminSlice.reducer;
