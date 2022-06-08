const TextInput = ({ text, value, onChange, placeholder }) => {
    return (
        <div>
            <label>{text} </label>
            <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/>
        </div>
    );
};

export default TextInput;
