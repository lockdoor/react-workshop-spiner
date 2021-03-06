import { useEffect, useState } from "react"
import ShowChoices from "./component/ShowChoices"
import FormInputChoice from "./component/FromInputChoice"
import Circle from "./component/Circle"
import SelectChoice from "./component/SelectChoice"
import UnSelectChoice from "./component/UnSelectChoice"
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
// ]

const Spiner = () => {
  const [choices, setChoices] = useState([])
  const [spin, setSpin] = useState(false)
  const [disabledSpinBtn, setDisableSpinBtn] = useState(false)
  const [duration, setDuration] = useState(0)
  const [fixChoice, setfixChoice] = useState(0)
  const [unChooseChoice, setUnChooseChoice] = useState([])
  
  const addChoice = (text) => {
    //หาชื่อซ้ำ
    const isExist =  choices.filter(choice => choice.name === text)
    if(isExist.length > 0){
      alert("Choice is Exist")
      return
    }
    //สร้าง object
    const lastId = choices.length === 0 ? 0 : choices[choices.length - 1].id
    const choice = {
      id: lastId + 1, 
      name: text,
      color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
    }
    setChoices(prev => {
      localStorage.setItem('data', JSON.stringify([...prev, choice]))
      return [...prev, choice]})
  }

  const removeChoice = (e, name) => {
    e.preventDefault()
    // console.log('id is ', typeof(id))
    setChoices(prev => {
      const arr = prev.filter(choice => {
        console.log(choice.name , name)
        return choice.name !== name})
      arr.forEach(((item, index) => arr[index].id = index + 1))
      localStorage.setItem('data', JSON.stringify(arr))
      return arr
    })
  }
  
  const spinBtnClickHandle = () => {
    // console.log('spin')    
    setSpin(!spin)
    setDisableSpinBtn(true)
    setTimeout(()=>{
      setDisableSpinBtn(false)
    }, spin? 10 : (duration +3) * 1000)
  }

  const selectChoiceChangeHandle = (e) => {
    e.preventDefault()    
    // console.log(e.target.value)
    setfixChoice(parseInt(e.target.value))
  }

  const unSelectChoiceHandle = (e) => {
    // e.preventDefault()
    const num = parseInt(e.target.value)
    if(e.target.checked){
      if(unChooseChoice.length >= choices.length - 1){
        alert('ต้องเหลือไว้ 1')
        e.target.checked = false
        return
      }else{
        setUnChooseChoice(prev => [...prev, num])
      }

    }else{
      setUnChooseChoice(prev => prev.filter(item => item !== num))
    }
    // console.log(e.target.value, e.target.checked) 
    // setUnChooseChoice(values)
    // console.log(values)
  }

  useEffect(()=>{
    const duration = Math.floor(Math.random()*10) + 10
    setDuration(duration)
    const data = JSON.parse(localStorage.getItem('data'))
    if(data){
      setChoices(data)
    }
  },[])

  useEffect(()=>{
    setDisableSpinBtn(choices.length < 2  ? true : false)
    // localStorage.setItem('data', JSON.stringify(choices))
    // console.log(choices)
  },[choices])
  
  // useEffect(()=>{console.log(unChooseChoice)},[unChooseChoice])
  
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
          unChooseChoice={unChooseChoice}
        />
        <button 
          onClick={spinBtnClickHandle}
          disabled={disabledSpinBtn}
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
          disabled={spin}
          />
        <ShowChoices 
          choices={choices} 
          removeChoice={removeChoice}
          spin={spin}
          />
        <SelectChoice 
          choices={choices}
          selectChoiceChangeHandle={selectChoiceChangeHandle}
          disabled={spin}
        />
        {fixChoice === 0 && <UnSelectChoice 
          choices={choices}
          disabled={spin}
          unSelectChoiceHandle={unSelectChoiceHandle}
          />}
      </div> 
    
       
  )
}
export default Spiner;
