import React, { useState, useEffect } from 'react';
import Link from "next/link";
import ChapterService from '@/services/ChapterService';
import { emitNotification } from '@/services/api';
import Modal from '@/components/Modal';

interface ChapterData {
  id: number;
  name: String;
}
const Index: React.FC = () => {
  const chapterService = new ChapterService();
  const [data, setData] = useState<ChapterData | null | any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chapterService.getList('/chapter?PageNumber=0&PageSize=200');
        if (Array.isArray(response.data)) {
          const modifiedData = response.data.map((item: ChapterData) => ({ id: item.id, name: item.name }));
          setData(modifiedData);
        }
      } catch (error) {
        //   setError('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, []);

  const renderDataRows = () => {
    let sn: number = 1;
    if (data && data.length > 0) {
      return data.map((item: ChapterData) => (
        <tr key={item.id} className="bg-white">
          <td className="px-6 py-4 text-left text-sm text-gray-500">
            {sn++}
          </td>
          <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex">
              {/* <a href="/" className="group inline-flex space-x-2 truncate text-sm"> */}
              <p className="capitalize text-gray-500 truncate group-hover:text-gray-900">
                {item.name}
              </p>
              {/* </a> */}
            </div>
          </td>
          <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex">
              <Link href={`chapters/edit/${item.id}`} className="mr-2 group inline-flex space-x-2 truncate text-xs hover:bg-blue-200 bg-blue-100 px-2 py-1 rounded-md text-blue-500">
                Edit
              </Link>
              <button onClick={() => handleOnclickDelete(item.id)} className="group inline-flex space-x-2 truncate text-xs hover:bg-red-200 bg-red-100 px-2 py-1 rounded-md text-red-500">
                Delete
              </button>
            </div>
          </td>
        </tr>
      ));
    } else {
      return (
        <>
          <tr><td colSpan={5} className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">No data.</td></tr>
        </>
      );
    }
  };

  const handleOnclickDelete = (id: number) => {
    setSelectedChapterId(id);
    setShowModal(true);
  }

  const deleteChapter = async () => {
    try {
      const response = await chapterService.delete(`/chapter/${selectedChapterId}`);
      if (response.data && response.status === 200) {
        const updatedList = data.filter((item: ChapterData) => item.id !== selectedChapterId);
        setData(updatedList);
        emitNotification("Deleted successfully", "success");
      }
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
                Chapters
              </h3>
              <div className="ml-auto">
                <Link
                  href="/chapters/add"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  New Chapter
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                      SN
                    </th>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderDataRows()}
                </tbody>
              </table>
            </div>
            {/* <Paginator paginate={this.state.carriers} onPageChange={(page) => this.handlePageClick(page)}></Paginator> */}
          </div>
        </div>
      </div>
      <Modal
        title="Delete Chapter"
        message="Are you sure you want to delete this?"
        type={`success`}
        show={showModal}
        onSuccess={deleteChapter}
        onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Index