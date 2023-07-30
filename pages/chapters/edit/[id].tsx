import { emitNotification } from "@/services/api";
import ChapterService from "@/services/ChapterService";
import SubjectService from "@/services/SubjectService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Subject {
  id: number;
  name: string;
};
const Edit: React.FC = ({ id }: any) => {
  const router = useRouter()
  const chapterService = new ChapterService();
  const subjectService = new SubjectService();
  const [subjects, setSubjects] = useState<Subject | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subjectId: 0
  });

  const getChapter = async (id: number) => {
    const result: any = await subjectService.getList(`/chapter?id=${id}`);
    setFormData(result.data);
  }

  const fetchSubjects = async () => {
    try {
      const result: any = await subjectService.getList('/subject?PageNumber=0&PageSize=200');
      setSubjects(result.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getChapter(id);
    fetchSubjects();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      description: '',
      subjectId: 0
    });
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await chapterService.update(`/chapter/${id}`, formData); // Replace with your payload data
      emitNotification("Edited successfully", "success");
      router.push("/chapters");
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
            <div className="w-full md:items-center">
              <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 pb-3 border-b border-gray-100">Edit Chapter</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">Create some beautiful chapter :)</p> */}
                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                          <input type="text" name="name" value={formData.name} onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Subject</label>
                        <div className="mt-2">
                          <select id="select" value={formData.subjectId} name="subjectId" onChange={handleSelectChange} className="border border-gray-300 rounded px-3 py-2 w-full">
                            {subjects && Array.isArray(subjects) && subjects.map((option: Subject) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                          <textarea name="description" rows={7} onChange={handleChange} id="first-name" className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">{formData.description}</textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 mb-5 flex items-center gap-x-2">
                  <Link href="/chapters" className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Cancel</Link>
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