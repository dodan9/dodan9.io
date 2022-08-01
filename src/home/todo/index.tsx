import { useState } from "react"

const Todo = () => {
    const [count, setCount] = useState<number>(0)
    const Button = ()=>{
        return <button onClick={()=>{setCount((count)=> count + 1)}}>click</button>
    }
 return(
    <div>
        <Button/>
        <Button/>
        <span>{count}</span>
    </div>
 )
}

export default Todo