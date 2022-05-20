import { useEffect, useState } from "react"
import ShowChoices from "./component/ShowChoices"
import FormInputChoice from "./component/FromInputChoice"
import Circle from "./component/Circle"
import SelectChoice from "./component/SelectChoice"
import {FaArrowDown} from "react-icons/fa"
import {ImSpinner10} from "react-icons/im"
import {MdAutorenew} from "react-icons/md"


const randomColor = () => Math.floor(100+ Math.random() * 150)
// const arrInit = [
//   {id: 1, name: 'ดำ', 
//   color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`}, 
//   {id: 2, name: 'แดง',
//   color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`},            
//   {id: 3, name: 'เขียว',
//   color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`},              
//   {id: 4, name: 'เหลือง',
//   color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`},              
//   // {id: 5, name: 'ขาว'},              
// ]

const Spiner = () => {
  const [choices, setChoices] = useState([])
  const [spin, setSpin] = useState(false)
  const [disabledBtn, setDisableBtn] = useState(false)
  const [duration, setDuration] = useState(0)
  const [fixChoice, setfixChoice] = useState(0)
  
  const addChoice = (text) => {        
    const lastId = choices.length === 0 ? 0 : choices[choices.length - 1].id
    const choice = {
      id: lastId + 1, 
      name: text,
      color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
    }
    setChoices(prev => [...prev, choice])
  }
  const removeChoice = (id) => {
    setChoices(prev => prev.filter(choice => choice.id !== id))
  }
  
  const spinBtnClickHandle = () => {
    // console.log('spin')    
    setSpin(!spin)
    setDisableBtn(true)
    setTimeout(()=>{
      setDisableBtn(false)
    }, spin? 10 : (duration +3) * 1000)
  }
  const selectChoiceChangeHandle = (e) => {
    console.log(e.target.value)
    setfixChoice(e.target.value)
  }

  useEffect(()=>{
    const duration = Math.floor(Math.random()*10) + 10
    setDuration(duration)
  },[])  
  
  return (    
      <div 
      style={{
        display: "flex",
        flexDirection: "column",
        margin: '5px auto',
        alignItems: "center",
        justifyContent: "center",
        minHeight: '100vh',
        width: 400,
        // border: '1px solid green'
      }}>
        <h1>Spiner Preject</h1>
        <FaArrowDown size={50} style={{marginBottom: 5}}/>
        <Circle choices={choices} spin={spin} 
          duration={duration} fixChoice={fixChoice}
        />
        <button 
          onClick={spinBtnClickHandle}
          disabled={disabledBtn}
          style={{
            width: '40%',
            padding: 10,
            marginBottom: 30,
            cursor: 'pointer',
            fontSize: 24
          }}
        >{spin 
        ? <span><MdAutorenew/>RENEW</span> 
        : <span><ImSpinner10/> SPIN</span>}</button>
        <FormInputChoice 
          addChoice={addChoice}
          />
        <ShowChoices 
          choices={choices} 
          removeChoice={removeChoice}
          spin={spin}
          />
        <SelectChoice 
          choices={choices}
          selectChoiceChangeHandle={selectChoiceChangeHandle}
        />
      </div> 
    
       
  )
}
export default Spiner;
