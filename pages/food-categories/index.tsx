import React, { useState, useEffect } from 'react';
import Link from "next/link";
import CategoryService from '@/services/CategoryService';
import Modal from '@/components/Modal';
import { emitNotification } from '@/services/api';
import { useRouter } from 'next/router';
import { capitalizeFirstLetter } from '@/utils/general';
import SVGRiceBowl from '@/components/svg/SVGRiceBowl';

interface CategoryData {
  _id: number;
  name: String;
}

const Index: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const categoryService = new CategoryService();
  const [data,
    setData] = useState<CategoryData | null | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryService.getList('/category/all');
        if (Array.isArray(response.data)) {
          const modifiedData = response.data.map((item: CategoryData) => ({ _id: item._id, name: item.name }));
          setData(modifiedData);
        }
      } catch (error) {
        //   setError('An error occurred while fetching the data.');
      }
    };

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
                <div className="ml-5">
                  {capitalizeFirstLetter(item.name)}
                </div>
              </div>
            </div>

            {/* <div className="mb-2 text-xs text-gray-400">{item.chapterName}</div> */}
            <div>
              <button onClick={() => router.push(`/lessons/edit/${item._id}`)} className="transition-all duration-300 text-xs text-gray-300 hover:text-green-400 hover:bg-green-50 px-3 py-1 rounded-sm">View</button>
              <Link href={`/food-categories/edit/${item._id}`} className="transition-all duration-300 text-xs text-gray-300 hover:text-cyan-400 hover:bg-cyan-50 px-3 py-1 rounded-sm">Edit</Link>
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
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 pb-5 border-b border-gray-200 sm:pb-0">
            <div className="flex pb-3 w-full md:items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Food Categories
              </h3>
              <div className="ml-auto">
                <Link
                  href="/food-categories/add"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  New Category
                </Link>
              </div>
            </div>
          </div>

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