import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formateDate } from "./../utilites/formattedDate";
import { toast } from "react-toastify";

export default function AddComment({ id}) {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const queryClient = useQueryClient()
  const {isPending,data,mutate:addcommentmutate} = useMutation({
    mutationFn: addComment,
    onSuccess:()=>{
      toast.success(data?.data?.message)
      queryClient.invalidateQueries({queryKey:['comments',id]})  
    },
    onError:()=>{
      toast.error('some error')
    },
    onSettled:()=>{
      reset()
    }
  });

  function addComment(formData) {
    console.log(formData);
    
    return axios.post(
      `https://route-posts.routemisr.com/posts/${id}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  console.log(data);
  

  async function handleAddComment(data) {
    
    const formData = new FormData();
    if (data.content) 
      formData.append("content", data.content);
    if(data.image[0])
      formData.append("image", data.image[0]);
  
    addcommentmutate(formData)
  }

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(handleAddComment)}>
        <label
          htmlFor="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="search"
            className="rounded-2xl  block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="add comment ...."
            {...register("content")}
          />
          <div className="flex   bg-red-500 relative">
            <input type="file" id="fileInput" className="hidden"  {...register("image")}/>
            <label htmlFor="fileInput">
              <i class="fa-solid fa-paperclip absolute top-1/2 start-1 translate-y-[-50%]"></i>
            </label>
            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="absolute end-1.5 bottom-7 text-white "
            >
                {isPending?<i className="fa-solid fa-spinner fa-spin"></i>:'add Comment'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
