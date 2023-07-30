import React, { useState, useEffect } from 'react';
import Link from "next/link";
import LessonService from '@/services/LessonService';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import { emitNotification } from '@/services/api';

interface LessonData {
  id: number;
  name: String;
  chapterName: string;
}

const Index: React.FC = () => {
  const lessonService = new LessonService();
  const router = useRouter();
  const [data, setData] = useState<LessonData | null | any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lessonService.getList('/lesson/list?PageNumber=0&PageSize=200');
        if (Array.isArray(response.data)) {
          const modifiedData = response.data.map((item: LessonData) => ({
            id: item.id,
            name: item.name,
            chapterName: item.chapterName
          }));

          setData(modifiedData);
        }
      } catch (error) {
        //   setError('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, []);

  const handleOnclickDelete = (id: number) => {
    setSelectedLessonId(id);
    setShowModal(true);
  }

  const deleteLesson = async () => {
    try {
      const response = await lessonService.delete(`/lesson/${selectedLessonId}`);
      if (response.data && response.status === 200) {
        const updatedList = data.filter((item: LessonData) => item.id !== selectedLessonId);
        setData(updatedList);
        emitNotification("Deleted successfully", "success");
      }
    } catch (error) {
      emitNotification("Something went wrong. Please try again.", "error");
    } finally {
      setShowModal(false);
    }
  }

  const renderDataRows = () => {
    return data && data.map((item: LessonData) => (
      <>
        <div key={item.id} className="flex flex-col items-start justify-between bg-white rounded-md px-4 py-4 pb-5">
          <div className="text-sm text-gray-500 font-semibold mb-1">
            <div className="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-green-600 mr-1" style={{minWidth: "16px"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <div>
                {item.name}
              </div>
            </div>
          </div>

          <div className="mb-2 text-xs text-gray-400">{item.chapterName}</div>
          <div>
            <button onClick={() => router.push(`/lessons/edit/${item.id}`)} className="transition-all duration-300 text-xs text-gray-300 hover:text-cyan-400 hover:bg-cyan-50 px-3 py-0 rounded-sm">Edit</button>
            <button onClick={() => handleOnclickDelete(item.id)} className="transition-all duration-300 text-xs text-gray-300 hover:text-red-400 hover:bg-red-50 px-3 py-0 rounded-sm">Delete</button>
          </div>
        </div>
      </>
    ));
  };

  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 pb-5 border-b border-gray-200 sm:pb-0">
            <div className="flex pb-3 w-full md:items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Lessons
              </h3>
              <div className="ml-auto">
                <Link
                  href="/lessons/add"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  New Lesson
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
        title="Delete Lesson"
        message="Are you sure you want to delete this?"
        type={`success`}
        show={showModal}
        onSuccess={deleteLesson}
        onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Index