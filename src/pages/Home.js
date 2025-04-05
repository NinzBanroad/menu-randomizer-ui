import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllRandomizeMenus,
  getAllMenus,
  addMenu,
  updateMenu,
  deleteMenu,
} from '../actions/menu';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';

const Home = ({
  getAllRandomizeMenus,
  getAllMenus,
  addMenu,
  updateMenu,
  deleteMenu,
  menu: { menus, loading, menus_with_meat, menus_without_meat },
}) => {
  useEffect(() => {
    getAllMenus();
  }, [getAllMenus]);

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [hasMeat, setHasMeat] = useState('');
  const [isOpenGenerateMenu, setIsOpenGenerateMenuModal] = useState(false);
  const [id, setId] = useState('');

  const onCloseGenerateMenuModal = () => {
    setIsOpenGenerateMenuModal(false);
  };

  const handleGenerateRandomizeMenu = (e) => {
    e.preventDefault();
    getAllRandomizeMenus();
    setIsOpenGenerateMenuModal(true);
  };

  // will handle the change of the radio button
  const handleChangeHasMeat = (e) => {
    setHasMeat(e.target.value === 'true' ? true : false);
  };

  // will set the title and description of the todo to be updated
  const handleUpdateMenu = (id) => (e) => {
    for (let i = 0; i < menus.length; i++) {
      if (id === menus[i]._id) {
        setName(menus[i].name);
        setIngredients(menus[i].ingredients);
        setHasMeat(menus[i].hasMeat);
      }
    }
    setId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      ingredients,
      hasMeat,
    };

    // if id is not empty, it means we are updating the todo
    if (id) {
      updateMenu(id, formData);
      setId('');
      setName('');
      setIngredients('');
      setHasMeat('');
    } else {
      addMenu(formData);
      setName('');
      setIngredients('');
      setHasMeat('');
    }
  };

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='col-span-1 sm:col-span-2 lg:col-span-1'>
            <form
              onSubmit={handleSubmit}
              className='max-w-sm mx-auto mt-2 sm:mt-6 md:mt-10 lg:mt-10 p-4'
            >
              <h1 className='text-3xl font-bold mb-5'>Menu Randomizer</h1>
              <span>
                Click &nbsp;
                <button
                  onClick={handleGenerateRandomizeMenu}
                  className='inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  GENERATE
                </button>{' '}
                to generate a randomize menu for the whole week.
              </span>
              <div className='mb-5 mt-5'>
                <label
                  htmlFor='title'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='description'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Ingredients
                </label>
                <textarea
                  type='text'
                  onChange={(e) => setIngredients(e.target.value)}
                  value={ingredients}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-40 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='description'
                  className='block mb-3 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Has Meat?
                </label>
                <div className='flex items-center mb-4'>
                  <input
                    type='radio'
                    value='true'
                    checked={hasMeat === true}
                    onChange={handleChangeHasMeat}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='default-radio-1'
                    className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Yes
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    value='false'
                    checked={hasMeat === false}
                    onChange={handleChangeHasMeat}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='default-radio-2'
                    className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    No
                  </label>
                </div>
              </div>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Submit
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className='col-span-1 sm:col-span-2 lg:col-span-2'>
            {menus === null ? (
              <Spinner />
            ) : (
              <div className='overflow-x-auto mt-2 sm:mt-6 md:mt-10 lg:mt-16'>
                <table className='min-w-full table-auto md:table-fixed text-sm sm:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' className='px-6 py-3 sm:p-1'>
                        #
                      </th>
                      <th scope='col' className='px-6 py-3 sm:p-1'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-3 sm:p-1'>
                        Ingredients
                      </th>
                      <th scope='col' className='px-6 py-3 sm:p-1'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus.map((menu, i) => (
                      <tr
                        key={menu._id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
                      >
                        <td className='px-6 py-4 sm:p-1'>{i + 1}</td>
                        <td className='px-6 py-4 sm:p-1'>{menu.name}</td>
                        <td className='px-6 py-4 w-64 sm:p-1'>
                          {menu.ingredients}
                        </td>
                        <td className='px-6 py-4 sm:p-1'>
                          <button
                            onClick={handleUpdateMenu(menu._id)}
                            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          >
                            Edit
                          </button>
                          &nbsp;
                          <button
                            onClick={() => deleteMenu(menu._id)}
                            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={isOpenGenerateMenu} onClose={onCloseGenerateMenuModal}>
        <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
          <div className='p-4 md:p-5 space-y-4'>
            <h1 className='text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400'>
              Monday, Tuesday, Thursday, Sunday ('With Meat')
            </h1>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {menus_with_meat &&
                menus_with_meat.slice(0, 4).map((menu, i) => (
                  <li key={i} className='list-disc'>
                    {menu.name}
                  </li>
                ))}
            </p>
            <h1 className='text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400'>
              Wednesday, Friday, Saturday ('Without Meat')
            </h1>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              {menus_without_meat &&
                menus_without_meat.slice(0, 3).map((menu, i) => (
                  <li key={i} className='list-disc'>
                    {menu.name}
                  </li>
                ))}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

Home.propTypes = {
  getAllRandomizeMenus: PropTypes.func.isRequired,
  getAllMenus: PropTypes.func.isRequired,
  addMenu: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  deleteMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menu: state.menu,
});

export default connect(mapStateToProps, {
  getAllRandomizeMenus,
  getAllMenus,
  addMenu,
  updateMenu,
  deleteMenu,
})(Home);
