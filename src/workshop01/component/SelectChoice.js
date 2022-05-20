const SelectChoice = ({choices, selectChoiceChangeHandle}) => {
  
  return (
    <select
      onChange={(e) => selectChoiceChangeHandle(e)}
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
  )
}
export default SelectChoice