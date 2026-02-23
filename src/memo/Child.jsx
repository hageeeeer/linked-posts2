import { memo } from "react";


export default memo( function Child({data,hi}) {

    hi()
    console.log('render child...');
    
  return (
    <div>Child {data.data}</div>
  )
})
