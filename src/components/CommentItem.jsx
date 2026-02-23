import { CardHeader } from '@heroui/card'
import React from 'react'
import { formateDate } from '../utilites/formattedDate'

export default function CommentItem({commentItem}) {
    
  const STATIC_IMAGE="https://static.thenounproject.com/png/363639-200.png"
  return (
    <>
         <CardHeader className="flex gap-3">
        <img
          alt="heroui logo"
          height={60}
          radius="full"
          src={commentItem.commentCreator?.photo}
          width={60}
          onError={(e)=>e.target.src=STATIC_IMAGE}
        />
        <div className="flex flex-col w-full">
          <p className="text-md">{commentItem.commentCreator?.name}</p>
          <img src={commentItem?.image} alt="" />
          <p className="text-small text-default-500">{formateDate(commentItem.createdAt)}</p>
          <p className="bg-gray-300 rounded-4xl p-3 my-4 w-full text-black">{commentItem?.content}</p>
        </div>
      </CardHeader>
    </>
  )
}
