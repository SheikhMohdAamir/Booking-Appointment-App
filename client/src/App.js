import React,{ useRef,useEffect,useState } from 'react'
import axios from 'axios'

const App = () => {
  const [fetchedData,setFetchedData]=useState([])
  const [data,setData]=useState('')

  useEffect(()=>{
    return async()=>{
       try{
      const req= await axios.get('http://localhost:5000')
      setFetchedData(req.data)
      console.log('GET Request Completed')
      }
      catch(err){
        console.log(err)
      }
      }
  },[data])

  const refName = useRef('')
  const refEmail = useRef('')
  const refPhone = useRef('')

  const submitHandler =async(event)=>{
    
    event.preventDefault()
    const name=refName.current.value
    const email=refEmail.current.value
    const phone=refPhone.current.value

    if(name.length===0){
      alert('Enter Some Value!')
      return
    }
    let userData={
      name:name,
      email:email,
      phone:phone
    }
    console.log('Clicked')
    try{
      const req= await axios.post('http://localhost:5000/post',userData)
      console.log(req.data)
      setData(userData)
    }
    catch(err){
      console.log(err)
    }
    refName.current.value=''
    refEmail.current.value=''
    refPhone.current.value=''
  }

  const deleteHandler=async(id)=>{
    const userId ={
      id:id
    }
    console.log(userId)
    try{
      const req=await axios.post('http://localhost:5000/delete',userId)
      console.log(req)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div style={{margin:'10% 38%'}}>
      <h1>Book Your Appointment!</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name='name' placeholder='Enter your name' ref={refName}/>
        <br />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' placeholder='Enter your email' ref={refEmail}/>
        <br />
        <br />
        <label htmlFor="phone">Phone</label>
        <input type="number" id='phone' name='phone' placeholder='Enter your phone' ref={refPhone}/>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {fetchedData.userDetails===undefined?<p>Loading...</p>:<ul>{fetchedData.userDetails.map((ele)=>{
        return <li key={ele.id}>{`Name is ${ele.name} Email is ${ele.email} & Phone number is ${ele.phone}`} <button type='button' onClick={()=>deleteHandler(ele.id)}>Delete</button></li>
      })}</ul>}
    </div>
  )
}

export default App
