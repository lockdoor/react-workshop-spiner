// import { useState } from "react"

const UnSelectChoice = ({choices, unSelectChoiceHandle, disabled}) => {
  // const [values, setValues] = useState([])

  // const checkboxChangeHandle = (e) => {    
  //   const num = parseInt(e.target.value)
  //   if(e.target.checked){
  //     if(values.length >= choices.length - 1){
  //       alert('ต้องเหลือไว้ 1')
  //       e.target.checked = false
  //       return
  //     }else{
  //       setValues(prev => [...prev, num])
  //     }
  //   }else{
  //     setValues(prev => prev.filter(item => item !== num))
  //   }
  //   // console.log(e.target.value, e.target.checked)      
  // }

  // useEffect(()=>{console.log(values)},[values])

  return (
    <form style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
        }}
      // onSubmit={(e)=>unSelectChoiceHandle(e, values)}
      >
    <div>UnSelect Winner</div>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {choices.map((choice, index) => {
        const name = choice.name
        return (
          <div key={index}>
            <input type="checkbox"
              onChange={(e)=>unSelectChoiceHandle(e)}
              disabled={disabled}
              name={name} value={choice.id}/>
            <label htmlFor={name}>{name}</label>          
          </div>
        )
      })}
      
    </div>
    {/* <div >
      <button type="submit"
        disabled={disabled}
        // onClick={()=>unSelectChoiceHandle}
        style={{
          display: 'inline-block',
          textAlign: "center"
        }}>submit</button>
    </div> */}
    
    </form>
  )
}

export default UnSelectChoice