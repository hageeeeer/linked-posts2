import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import Loading from "./Loading";

export default function PostDetails() {
  const { id } = useParams();

  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ["postdetails" ,id ],
    queryFn: getPostDetails,
  });

  


if(isLoading)
    return <Loading></Loading>


if(isError)
    return <h2>some error</h2>


  return <div>
    <PostItem postItem={data?.data?.data?.post} isHome={false}/>
  </div>;
}
