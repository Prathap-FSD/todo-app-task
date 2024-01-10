import './App.css';
import React, { useState } from 'react'


function App() {

  let [cardList , setCardList] = useState([])
  const [statusFilter, setStatusFilter] = useState('all');

  const toggleStatus = (value, id) => {
    const updatedTasks = cardList.map((task) =>
    task.id === id ? { ...task, status: task.status === 'not-completed' ? value : 'not-completed' } : task
    );
    setCardList(updatedTasks);
  };

  const filterTasks = () => {
 
    if(statusFilter === 'completed') {
        return cardList.filter((task) => task.status === 'completed');
    }else if(statusFilter === 'not-completed'){
      
      return cardList.filter((task) => task.status === 'not-completed');
    }else{
      return cardList;
    }
    }
       

function editCard(card, id, editName, editDescription){
  let cardIndex = cardList.findIndex((c)=> c === card)
 let updateCardList = [...cardList]
 updateCardList[cardIndex] = {...card, name:editName, description : editDescription }
  setCardList(updateCardList)

}

  function deleteCard(card){
    setCardList(cardList.filter((value=>value !== card)))
    
  }
  return (
    <div className="App">
    <Addtask cardList={cardList} setCardList={setCardList} />
      <div>
        <div className='container'>
          {cardList.length>0? <div className='col-md-12 d-flex justify-content-between mt-5 '>
          <h3 className='text-light'>My Todo's</h3>
          <div className='d-flex'>
          <h3 className='text-light me-3'>Status Filter </h3>
          <select  style={{background:"#ffc107", color:"#000", fontWeight:700}} onChange={(e)=> setStatusFilter(e.target.value)}>
          <option value={"all"} >All</option>
          <option value={"completed"}>Completed</option>
          <option value={"not-completed"} >Not completed</option>
          </select>
          </div>
          </div>: null}
          <div className='row mt-3'>
          {filterTasks().map((card,)=>(
            <Taskcard key={card.id} card={card} setCardList={setCardList} editCard={editCard} deleteCard={deleteCard} toggleStatus={(value) => toggleStatus(value, card.id)}/>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}



function Addtask({cardList,setCardList}) {
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')

return (
  <div className='container'>
  <div className='head pt-5'>
      <h4 className='text-center'>MY TODO</h4>
      <div className='col-md-12 mt-4 frm'>
      <input type='text' name='name' placeholder='Todo name' onChange={(e)=> setName(e.target.value)}/>
      <input type='text' name='description' placeholder='Todo Description' onChange={(e)=> setDescription(e.target.value)}/>
      <button onClick={()=>{
          let task={
            id: Date.now(),
              name,
              description,
              status : "not-completed"
          }
          if(name !== '' && description !== ''){
            setCardList([...cardList, task])
          
          }
      }}> Add Todo</button>
      </div>
  </div>
  </div>
)
}

function Taskcard({card,editCard, deleteCard,toggleStatus}) {

return (
    <div className='col-md-4'>
  <div className='card mt-3'>
  <div className='card-header'>
  <p><b>Name :</b> {card.name} </p>
  </div>
    <div className='card-body'>
    
    <p><b>Description :</b> {card.description}  </p>
    <b>Status :</b> <select onChange={(e) => {
      let value = e.target.value
      toggleStatus(value, card.id)
    }} value={card.status}>
    
    <option value={'not-completed'} >Not completed</option>
    <option value={'completed'} >Completed</option>
    </select>
    <div className='d-flex justify-content-end'>
      <button className='btn btn-secondary me-3' onClick={()=>{
        let editName = prompt('Edit', card.name)
        let editDescription = prompt('Edit', card.description)
        if(editName !== null  && editDescription !== null ){
          editCard(card,card.id, editName, editDescription)}
      }}>Edit</button>
      <button className='btn btn-warning' onClick={()=> {
        deleteCard(card)
      }}>Delete</button>
    </div>
    </div>
  </div>  
  </div>
)
}

export default App;
