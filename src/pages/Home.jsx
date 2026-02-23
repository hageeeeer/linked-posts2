import { toast } from "react-toastify";
import Loading from "./Loading";
import PostItem from "../components/PostItem";

import CreatePost from "../components/CreatePost";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const { isLoading, isError, data } = useFetch(
    `https://route-posts.routemisr.com/posts`,
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>Some error</h2>;

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <CreatePost />
        <div className="">
          {data?.map((post, index) => (
            <PostItem key={post?._id} postItem={post} isHome></PostItem>
          ))}
        </div>
      </div>
    </div>
  );
}

// state mangement ==> api
// tanstack query ==> cashing
