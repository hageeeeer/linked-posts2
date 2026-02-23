import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { formateDate } from './../utilites/formattedDate';
import { toast } from "react-toastify";

export default function CreatePost() {
  const [isOpen, setOpen] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

//   ref
const fileInput = useRef(null)
const bodyInput = useRef(null)

// invalid queries

const queryClient = useQueryClient()

const  {isPending,isError,error,data,mutate} = useMutation({
    mutationFn:handleCreatePost,
    onSuccess:()=>{
        toast.success(data?.data?.data?.message)
        queryClient.invalidateQueries({queryKey:['posts']})
    },
    onSettled:()=>{
         handleCancel()
    }
})

if(isError)
{
    toast.error(error?.response?.data?.message)
}

function handlePostSubmit()
{
    const formData = new FormData();
    if(bodyInput.current.value)
        formData.append('body',bodyInput.current.value)
    if(fileInput.current.files[0])
        formData.append('image',fileInput.current.files[0])
    mutate(formData)
   

}

function handleCreatePost(formData)
{
     return axios.post(`https://route-posts.routemisr.com/posts`,formData,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
}




  function handleMenuOpen() {
    setOpen(true);
  }
  function handleCancel() {
    setOpen(false);
    bodyInput.current.value = "";
    closeButton()
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgPreview(url);
    }
  }

  function closeButton() {
    setImgPreview(null);
    fileInput.current.value = null
  }

  return (
    <>
      <div className="editor mx-auto  my-5 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg rounded-lg">
        <input
          onClick={handleMenuOpen}
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="create Post ..."
          type="text"
          ref={bodyInput}
        />

        {/* image Preview */}

        {imgPreview && (
          <div className="relative">
            <img src={imgPreview} className="w-full" alt="" />
            <i
              onClick={closeButton}
              className="fa-solid top-3 end-3 fa-close fa-2x cursor-pointer absolute font-bold"
            ></i>
          </div>
        )}
        <input
          type="file"
          onChange={handleImage}
          className="hidden"
          id="fileInput"
          ref={fileInput}
        />
        {/* file input */}
        {/* icons */}
        {isOpen && (
          <div className="icons flex text-gray-500 m-2 justify-between">
            <label htmlFor="fileInput">
              <svg
                className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </label>

            {/* buttons */}
            <div className="buttons flex">
              <div
                onClick={handleCancel}
                className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
              >
                Cancel
              </div>
              <div onClick={handlePostSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">
                {isPending?'Posting...':'Post'}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
