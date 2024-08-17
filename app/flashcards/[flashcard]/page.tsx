import React from 'react'

export default function Flashcard({params}:{
    params: {flashcard: string}
}) {
  return (
    <div>
      in the flashcard with id {params.flashcard}
    </div>
  )
}
