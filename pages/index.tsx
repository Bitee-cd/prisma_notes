import { prisma } from "@/lib/prisma";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface FormData {
  id: string;
  title: string;
  content: string;
}
interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}
const Home = ({ notes }: Notes) => {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });
  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (err) {
      console.log(err);
    }
  };
  async function create(data: FormData) {
    try {
      fetch("/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => setForm({ title: "", content: "", id: "" }));
    } catch {}
  }
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-strech"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-500 p-1"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border-2 rounded border-gray-500 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes?.map((note) => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="justify-between flex">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-sm">{note.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma?.note.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
  return {
    props: {
      notes,
    },
  };
};
