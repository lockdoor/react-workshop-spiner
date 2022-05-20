import { useState } from "react"

const FormInputChoice = ({addChoice}) => {  
  const [text, setText] = useState('')
  const inputChangeHandle = (e) => {
    setText(e.target.value)
  }
  const buttonClickHandle = (e) => {
    e.preventDefault()
    if(text === ''){
      alert('Please Input Choice Name')
      return
    }
    addChoice(text.trim())
    setText('')
  }
  return(
    <form>
      <div style={{textAlign: "center"}}>Insert Your Choice</div>
      <input type="text" value={text} onChange={inputChangeHandle}/>
      <button onClick={buttonClickHandle}>submit</button>
    </form>    
  )
}

export default FormInputChoice