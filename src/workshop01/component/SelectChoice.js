const SelectChoice = ({choices, selectChoiceChangeHandle, disabled}) => {
  
  return (
    <label> Select Winner: 
    <select
      onChange={(e) => selectChoiceChangeHandle(e)}
      disabled={disabled}
      style={{
        marginBottom: 20
      }}
    >
      <option value={0} defaultValue>random</option>
      {choices.map((choice, index) => {
        return (
          <option key={index} value={choice.id}>
            {choice.name}
          </option>
        )
      })}
    </select>
    </label>
  )
}
export default SelectChoice