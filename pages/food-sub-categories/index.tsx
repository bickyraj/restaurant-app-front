import React, { useState, useEffect } from 'react';
import Link from "next/link";
import SubCategoryService from '@/services/SubCategoryService';
import Modal from '@/components/Modal';
import { emitNotification } from '@/services/api';
import { useRouter } from 'next/router';
import { capitalizeFirstLetter } from '@/utils/general';
import SVGRiceBowl from '@/components/svg/SVGRiceBowl';
import SVGBurger from '@/components/svg/SVGBurger';

interface CategoryData {
  _id: number;
  name: String;
}

const Index: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const categoryService = new SubCategoryService();
  const [data,
    setData] = useState<CategoryData | null | any>(null);

  const fetchData = async () => {
    try {
      const response = await categoryService.getList('/sub-category/all');
      if (Array.isArray(response.data)) {
        const modifiedData = response.data.map((item: CategoryData) => ({ _id: item._id, name: item.name }));
        setData(modifiedData);
      }
    } catch (error) {
      //   setError('An error occurred while fetching the data.');
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const renderDataRows = () => {
    if (data && data.length > 0) {
      return data && data.map((item: CategoryData) => (
        <div key={item._id} className="flex flex-col items-start justify-between bg-white rounded-md px-4 py-4 pb-3">
          <div className="text-sm text-gray-500 font-semibold mb-4">
            <div className="flex justify-center items-center">
              <SVGRiceBowl
                color="#0891b2"
                class="w-16 h-16"
              />
              <div className="ml-5 capitalize">
                {capitalizeFirstLetter(item.name)}
              </div>
            </div>
          </div>

          {/* <div className="mb-2 text-xs text-gray-400">{item.chapterName}</div> */}
          <div>
            <button onClick={() => router.push(`/lessons/edit/${item._id}`)} className="transition-all duration-300 text-xs text-gray-300 hover:text-green-400 hover:bg-green-50 px-3 py-1 rounded-sm">View</button>
            <Link href={`/food-sub-categories/edit/${item._id}`} className="transition-all duration-300 text-xs text-gray-300 hover:text-cyan-400 hover:bg-cyan-50 px-3 py-1 rounded-sm">Edit</Link>
            <button onClick={() => handleOnclickDelete(item._id)} className="transition-all duration-300 text-xs text-gray-300 hover:text-red-400 hover:bg-red-50 px-3 py-1 rounded-sm">Delete</button>
          </div>
        </div>
      ));
    } else {
      return (
        <>
          <div className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">No data.</div>
        </>
      );
    }
  };

  const handleOnclickDelete = (id: number) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  }

  const deleteCategory = async () => {
    try {
      const response = await categoryService.delete(`/category/${selectedCategoryId}`);
      const updatedList = data.filter((item: CategoryData) => item._id !== selectedCategoryId);
      setData(updatedList);
      emitNotification("Deleted successfully", "success");
    } catch (error) {
      emitNotification("Something went wrong. Please try again.", "error");
    } finally {
      setShowModal(false);
    }
  }

  return (
    <div>
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-cool-gray-200">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <SVGBurger
                  class="h-16 w-16"
                />
                <div>
                  <div className="flex items-center">
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-cool-gray-900 sm:leading-9 sm:truncate">
                      Food Sub Categories
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Company</dt>
                    <dd className="flex items-center text-sm leading-5 text-cool-gray-500 font-medium capitalize sm:mr-6">
                      {/* <!-- Heroicon name: office-building --> */}
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      Paris, France
                    </dd>
                    <dt className="sr-only">Account</dt>
                    <dd className="mt-3 flex items-center text-sm leading-5 text-cool-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                      {/* <!-- Heroicon name: check-circle --> */}
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <span className="shadow-sm rounded-md">
                <button onClick={fetchData} type="button" className="inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-cool-gray-800 active:bg-cool-gray-50 transition duration-150 ease-in-out">
                  Refresh
                </button>
              </span>
              <span className="shadow-sm rounded-md">
                <Link
                  href="/food-sub-categories/add" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:shadow-outline-cyan focus:border-cyan-700 active:bg-cyan-700 transition duration-150 ease-in-out">
                  New Sub Category
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto overflow-hidden mb-5">
              <div className="grid grid-cols-4 gap-4">
                {renderDataRows()}
              </div>
            </div>
            {/* <Paginator paginate={this.state.carriers} onPageChange={(page) => this.handlePageClick(page)}></Paginator> */}
          </div>
        </div>
      </div>
      <Modal
        title="Delete Category"
        message="Are you sure you want to delete this?"
        type={`success`}
        show={showModal}
        onSuccess={deleteCategory}
        onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Index