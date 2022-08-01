import { useState } from "react"

const Todo = () => {
    const [count, setCount] = useState<number>(0)
 return(
    <div>
        <button onClick={()=>{setCount((count)=> count + 1)}}>click</button>
        <span>{count}</span>
    </div>
 )
}

export default Todo