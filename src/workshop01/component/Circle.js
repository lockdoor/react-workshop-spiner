import { useEffect, useState } from 'react';
import './Circle.css';
const Circle = ({choices, spin, duration, fixChoice}) => {
  const [showFinish, setShowfinish] = useState(false)
  const [fixDegree, setFixDegree] =  useState(0)
  const [winner, setWinner] = useState(0)
  const [angle, setAngle] = useState(0)

  const toDegree = 3600 - fixDegree
  document.documentElement.style.setProperty('--to-degree', `${toDegree}deg`)
  document.documentElement.style.setProperty('--duration', `${duration}s`)

  useEffect(()=>{
    setAngle(360 / choices.length)
  }, [choices])

  useEffect(()=>{
    const randomNum = Math.random()
    // console.log(randomNum)
    const fix = Math.floor(randomNum*360)
    setFixDegree(()=>{
      if(fixChoice === 0){
        return fix
      }else{
        return (angle * fixChoice) - Math.floor(randomNum*angle)
      }
    })
    setWinner(()=>{
      if(fixChoice !== 0){
        return fixChoice -1
      }else{
        return Math.floor(fix / angle)
      }
    })
  },[spin, angle, fixChoice])

  useEffect(()=>{
    const circleSpin = () => {
      if(spin){
        setTimeout(()=>{
          setShowfinish(true)
          // console.log('finish')
        },(duration + 3)*1000)
      }else{
        setShowfinish(false)
      }           
    }
    circleSpin()
  }, [spin, duration])
  
  return (
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 320,
        overflow: 'hidden',
        borderRadius: '50%',
        // border: '1px solid black',
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
    >
      {showFinish 
        ? <div style={{
          position: 'absolute',
          backgroundColor: choices[winner].color,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span
            style={{
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 20,
            }}
          >Winner is {choices[winner].name}</span></div>
        : <ul className={spin ? 'spin' : ''}
        style={{
          position: 'absolute',
          top: -50,
          left: -35,
          border: '1px solid black',
          padding: 0,
          margin: '1em auto',
          width: 390,
          height: 390,
          borderRadius: '50%',
          listStyle: 'none',
          overflow: 'hidden',
          display: 'flex',
      }}
    >
    {
      choices.map((choice, index) => {    
        return (
          <li 
            key={index}
            style={choices.length === 1
              ? listStyle1(index, angle, choice)
                : choices.length === 2 
                  ? listStyle2(index, angle, choice)
                  : listyle3up(index, angle, choice)}
          >
            <span style={{
              position: choices.length > 2 ? 'absolute' : 'relative',
              bottom: choices.length > 2 ? angle : 0,
              left: choices.length > 2 ? angle : 0,
              textAlign: 'center',
              transform: choices.length > 2 ? `rotate(${angle}deg)` : 'none',
            }}>{index + 1}</span>
          </li>
        )
      })
    }
  </ul>
      }
      
      
    </div>    
  )
}

export default Circle
const listyle3up = (index, angle, choice) =>{
  return {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '50%',
    backgroundColor: choice.color,
    // border: '1px solid black',
    transformOrigin: '0% 100%',
    transform: `rotate(${index * angle}deg) skewY(${-90 + angle}deg)`,
    // display: 'flex',
    // alignItems: "center",
    // justifyContent: "center",
  }                
}
const listStyle2 = (index, angle, choice) =>{
  return {
    overflow: 'hidden',
    position: 'relative',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%',
    backgroundColor: choice.color,
    // border: '1px solid black',
    transformOrigin: '0% 100%',
    // transform: `rotate(${index * angle}deg))`,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  }
}
const listStyle1 = (index, angle, choice) =>{
  return {
    overflow: 'hidden',
    position: 'relative',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: choice.color,
    // border: '1px solid black',
    transformOrigin: '0% 100%',
    // transform: `rotate(${index * angle}deg))`,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  }
}

