import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { formateDate } from "../utilites/formattedDate";
import CommentItem from "./CommentItem";
import { NavLink } from "react-router-dom";
import AddComment from "./AddComment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { authContext } from "../context/AuthContext";
import UpdateModal from "./UpdateModal";

export default function PostItem({ postItem, isHome }) {
  const {
    image,
    body,
    user: { photo, name },
    createdAt,
  } = postItem;

  // get comments

  const { data, error } = useQuery({
    queryKey: ["comments", postItem?._id],
    queryFn: getPostComments,
  });

  const firstComment = data?.data?.data?.comments?.[0];

  // auth context

  const { userData } = useContext(authContext);

  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${postItem?._id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  return (
    <Card className="mb-7  w-full bg-gray-700 p-5">
      <CardHeader className="flex  ">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3">
            <Image
              alt="heroui logo"
              height={60}
              radius="full"
              src={photo}
              width={60}
            />
            <div className="flex flex-col">
              <p className="text-md">{name}</p>
              <p className="text-small text-default-500">
                {formateDate(createdAt)}
              </p>
            </div>
          </div>
          {userData?._id === postItem?.user?._id && (
            <div>
              <UpdateModal id={postItem?._id} post={postItem}></UpdateModal>
            </div>
          )}
        </div>
      </CardHeader>
      <Divider />

      <CardBody>
        <img src={image} className="w-full h-[400px]" alt="" />
        <p className="my-3">{body}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between text-center w-full">
          <div>
            <i className="fa-solid fa-thumbs-up txet-white font-bold"></i>
            <p>like</p>
          </div>
          <div>
            <i className="fa-solid fa-comment txet-white font-bold"></i>
            <p>comments</p>
          </div>
          <div>
            <i className="fa-solid fa-share txet-white font-bold"></i>
            <p>share</p>
          </div>
        </div>
      </CardFooter>

      <Divider />

      <AddComment id={postItem?._id} />

      {/* comments */}

      {isHome && (
        <NavLink
          className="text-center text-blue-700 font-bold my-2"
          to={`/postdetails/${postItem?._id}`}
        >
          Show More comments
        </NavLink>
      )}

      <Divider />
      {isHome && firstComment && isHome && (
        <CommentItem commentItem={firstComment} />
      )}

      {!isHome &&
        data?.data?.data?.comments?.map((comm) => (
          <CommentItem key={comm?._id} commentItem={comm}></CommentItem>
        ))}

      {/* comment */}
    </Card>
  );
}
