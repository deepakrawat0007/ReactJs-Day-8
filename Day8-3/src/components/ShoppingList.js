import { useState } from "react";
import "./shopping.css";


const ShoppingList = () => {
    const [item, setItem] = useState('')
    const [ Total , setTotal] = useState(0)
    const [list, setList] = useState([])

    const handleSubmit = () => {
        setList([...list, { des: item, count: 1, itemCheck: false }])
        setTotal(Total+1)
        setItem('')
    }
    const handleIncrement = (id) => {
        setTotal(Total+1)
        const newList = list.map((data, idx) => {
            if (id === idx) {
                return { ...data, count: data.count + 1 };
            }
            return { ...data };
        })
        setList(newList)
    }
    const handleDecrement = (id) => {
        setTotal(Total-1)
        const newList = list.map((data, idx) => {
            if (id === idx) {
                return { ...data, count: data.count - 1 };
            }
            return { ...data };
        })
        setList(newList)
    }
    const handlestyle = (id) => {
        const editList = list.map((data, idx) => {
            if (id === idx) {
                if (!data.itemCheck) {
                    return { ...data, itemCheck: true }
                } else {
                    return { ...data, itemCheck: false }
                }
            }
            return { ...data }
        })
        setList(editList)
    }
    return (
        <>
            <div className="wrapper">
                <input type={"text"} placeholder="Add an Item..." value={item} onChange={(e) => { setItem(e.target.value) }} />
                <button className="add-item" onClick={handleSubmit}>+</button>
                {list.map((items, idx) => (
                    <div className="card" key={idx}>

                        <input type={"checkbox"} onClick={() => { handlestyle(idx) }} />
                        <span className={items.itemCheck ? "dashed" : "normal"}>{items.des}</span>
                        <div className="btns">
                            <button className="inc" onClick={() => { handleDecrement(idx) }}>&lt;</button>
                           <span className="count">{items.count}</span> 
                            <button className="dec" onClick={() => { handleIncrement(idx) }}>&gt;</button>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="Total">
                  <p> Total: {Total}</p>
                </div>
        </>
    )
}

export default ShoppingList;