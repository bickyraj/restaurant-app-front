import { useState, useEffect, useRef } from "react";
import { emitNotification } from "@/services/api";
import LessonService from "@/services/LessonService";
import ChapterService from "@/services/ChapterService";
import dynamic from "next/dynamic";

interface Chapter {
  id: number;
  name: string;
};
const CKeditor = dynamic(() => import("@/components/CKEditor"), { ssr: false });

const Add: React.FC = () => {
  const lessonService = new LessonService();
  const chapterService = new ChapterService();
  const [formData, setFormData] = useState({
    name: '',
    chapterId: '',
    html: '',
    description: ''
  });
  const [chapters, setChapters] = useState<Chapter | null>(null);

  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [errors, setErrors] = useState({
    name: '',
    chapterId: '',
    html: '',
    description: ''
  });

  useEffect(() => {
    setFormData({
      ...formData,
      html: content,
    });
  }, [content]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const result: any = await chapterService.getList('/chapter?PageNumber=0&PageSize=200');
        setChapters(result.data);
      } catch (error) {
        throw error;
      }
    };

    fetchChapters();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const clearFormData = () => {
    setContent("");
    setFormData({
      name: '',
      chapterId: '',
      html: '',
      description: ''
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call your API here using the form data
    try {
      await lessonService.create('/lesson/create_admin', formData); // Replace with your payload data
      emitNotification("Added successfully", "success");
      clearFormData();
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 p-5 border-b border-gray-200 sm:pb-0 bg-white">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Add New Lesson</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                          <input type="text" name="name" value={formData.name} onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Chapter</label>
                        <div className="mt-2">
                          <select id="select" name="chapterId" onChange={handleSelectChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                            {chapters && Array.isArray(chapters) && chapters.map((option: Chapter) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                          <textarea rows={4} name="description" onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"></textarea>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Content</label>
                        <div className="block mt-2 w-full">
                          <CKeditor
                            value=""
                            name="html"
                            onChange={(data: string) => {
                              setContent(data);
                            }}
                            editorLoaded={editorLoaded}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <button type="button" className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</button>
                  <button type="submit" className="rounded-md bg-cyan-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;