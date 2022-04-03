const TextInput = ({ text, value, onChange }) => {
    return (
      <div>
        {text}: <input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  };
  
  export default TextInput;  