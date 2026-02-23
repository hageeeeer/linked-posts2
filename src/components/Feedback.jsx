import React from 'react'

export default function Feedback({msg}) {
  return (
    <div
              class="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-red-200"
              role="alert"
            >
              <span class="font-medium"></span> {msg}
            </div>
  )
}
