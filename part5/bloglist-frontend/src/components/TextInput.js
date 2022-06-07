const TextInput = ({ text, value, onChange }) => {
    return (
        <div>
            <label>{text} </label>
            <input value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default TextInput;
