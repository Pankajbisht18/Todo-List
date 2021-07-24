import { useEffect, useState } from "react";
import './Todo.css';

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems())
    const [isEdit, setIsEdit] = useState(null);
    const [toggle,setToggle] = useState(true);
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items));
    },[items])
    const addItem = () => {
        if(!inputData) {
            alert("Kindly Fill The Task Box")
        }
        else if(inputData && !toggle){
            setItems(
                items.map((elem)=>{
                    if(elem.id === isEdit){
                        return{...elem, name:inputData}
                    }
                    return elem;
                })
            )
            setInputData('');
            setToggle(true);
            setIsEdit(null);
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name:inputData}
            setItems([...items,allInputData]);
            setInputData('')
        }
    }
    const handleDelete = (id) =>{
        const updateItems = items.filter((data)=>{
            return id !== data.id;
        });
        setItems(updateItems)
    } 
    const handleKeypress = (e) => {
        if(e.charCode === 13) {
            addItem();
        }
      }
    const editItem = (id) => {
        let newEditItem = items.find((elem)=>{
            return elem.id === id
        })
        setInputData(newEditItem.name);
        setToggle(false);
        setIsEdit(id);
    }

    console.log(items);
    return ( 
        <div className="container text-center mt-5">
            <h1>Todo List</h1>
            <input 
                type="text" 
                placeholder="Enter your task" 
                value={inputData}
                className="task"
                onChange={(e)=>setInputData(e.target.value)} 
                onKeyPress={handleKeypress}
            />
            <br />
            <input 
                type="button" 
                value="Add Task" 
                onClick={addItem}
                className="task-button"
            />
            {
                items.map((data,i)=>{
                    return(
                        <div className="list" key={data.id}>
                            <h4 className="todo">{data.name}</h4>
                            <div>
                                <button className="edit" onClick={()=>editItem(data.id)}><i className="fas fa-edit"></i></button>
                            
                                <button className="delete" onClick={()=>handleDelete(data.id)}><i className="fas fa-trash"></i></button>
                            </div>
                            
                        </div>
                    );
                })
            }
        </div>
     );
}
export default Todo;