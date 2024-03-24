"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";



export default function Home() {

  const [itemName, setItemName] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setItemName(value)
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`/api/saveData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemName),
    });
    // console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <form onSubmit={handleSubmit} className={`mx-6 flex flex-row justify-center items-center w-full`}>
        <input type="text" id="item" name="item" value={itemName} onChange={handleChange} placeholder="Add your item" className="w-full sm:w-6/12 p-2 rounded-md outline-none border border-[#171717] text-[#171717]" />
        <button type="submit" className="text-gray-900 bg-gray-100 ml-2 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2">
          Submit
        </button>
      </form>
    </main>
  );
}
