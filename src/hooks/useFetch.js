import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(url) {
  function getPost() {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
    select:(data)=>data?.data?.data?.posts
  });

  return {
    isLoading, isError, data
  }
}
