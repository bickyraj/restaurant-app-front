import { useState, useEffect, useRef, useCallback } from "react";
import { emitNotification } from "@/services/api";
import LessonService from "@/services/LessonService";
import ChapterService from "@/services/ChapterService";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
interface Chapter {
  id: number;
  name: string;
};
const CKeditor = dynamic(() => import("@/components/CKEditor"), { ssr: false });

const lessonService = new LessonService();
const chapterService = new ChapterService();
const Edit: React.FC = ({ id }: any) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    chapterId: 0,
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
    chapterId: 0,
    html: '',
    description: ''
  });

  useEffect(() => {
    setFormData({
      ...formData,
      html: content,
    });
  }, [content]);

  const fetchLesson = async () => {
    try {
      const result: any = await lessonService.get('/lesson', id);
      const lesson: any = result.data;
      lesson.html = ""
      setFormData(lesson);
    } catch (error) {
      throw error;
    }
  }

  const fetchLessonContent = async () => {
    const result: any = await lessonService.get('/file/lesson/download', id);
    setContent(result.data ?? "")
  }
  
  const fetchChapters = async () => {
    try {
      const result: any = await chapterService.getList('/chapter?PageNumber=0&PageSize=200');
      setChapters(result.data);
    } catch (error) {
      throw error;
    }
  };
  
  useEffect(() => {
    fetchLessonContent();
    fetchLesson();
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
      id: null,
      name: '',
      chapterId: 0,
      html: '',
      description: ''
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call your API here using the form data
    try {
      console.log(formData);
      const result = await lessonService.update(`/lesson/edit_admin/${id}`, formData) // Replace with your payload data
      emitNotification("Edited successfully", "success");
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleContentChange = (content: any, editor: any) => {
    setFormData({
      ...formData,
      html: content,
    });
  }

  const handleImageUpload = useCallback(
    (blobInfo: any) => {
      // Implement your image upload logic here and return a promise that resolves to the image URL.
      // For this example, we'll simulate a delay and then provide a public image URL.
      // In a real application, you should upload the image to a server and provide the actual URL.
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            resolve(''); // Return an empty string in case of an error
          }
        };
        reader.readAsDataURL(blobInfo.blob());
      });
    },
    []
  );


  return (
    <div>
      <div className="hidden sm:block mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-5 p-5 border-b border-gray-200 sm:pb-0 bg-white">
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Edit New Lesson</h2>
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
                          <select id="select" value={formData.chapterId} name="chapterId" onChange={handleSelectChange} className="border border-gray-300 rounded px-3 py-2 w-full">
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
                          <textarea rows={4} value={formData.description ?? ""} name="description" onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"></textarea>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Content</label>
                        <div className="block mt-2 w-full">
                          <Editor
                            key={formData.id}
                            apiKey="5x5a9p6njq0osxg7r0rw3n0dp270uc3yet4mlsvzq9yjger1"
                            // onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={content}
                            init={{
                              height: 500,
                              menubar: true,
                              plugins: [
                                'image',
                                'code',
                                'media',
                                'codesample'
                              ],
                              toolbar: 'undo redo | formatselect | media image code codesample |' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                              images_upload_handler: handleImageUpload,
                              image_caption: true,
                              image_title: true
                            }}
                            onEditorChange={handleContentChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <Link href={"/lessons"} className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</Link>
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
export async function getServerSideProps(context: any) {
  const { params } = context;
  const { id } = params;
  return {
    props: {
      id,
    },
  };
}
export default Edit;