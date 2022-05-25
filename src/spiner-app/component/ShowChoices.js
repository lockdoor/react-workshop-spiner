import {MdDeleteForever} from 'react-icons/md'

const ShowChoices = ({choices, removeChoice, spin}) => {
  return (
    <ol style={{
      listStyleType: "none",
      // border: '1px solid red',
      padding: 0,
      width: '100%',
      // overflow: 'hidden'
      
    }}>
      {choices.map((choice, index) => {
        // console.log(choice.color)
        return (
          <li 
            style={{
              backgroundColor: choice.color,
              marginBottom: 5,
              padding: 10,
              // width: '100%',
              display: 'flex',
              borderRadius: 7
            }}
            key={index}>
              <span style={{
                // border: '1px solid blue',
                flex: 1
              }}>{index + 1}</span>
              <span style={{
                // border: '1px solid blue',
                flex: 7
              }}>{choice.name}</span>
              
              <button disabled={spin}
              style={{
                flex: 1
              }}
                onClick={(e)=>removeChoice(e, choice.name)}
              >
                <MdDeleteForever size={20} color={'red'}/>
              </button>
          </li> 
        )
      }       
                 
      )}
    </ol>
  )
}
export default ShowChoices