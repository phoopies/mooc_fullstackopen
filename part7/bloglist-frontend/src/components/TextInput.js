const TextInput = ({ text, value, onChange, id, placeholder }) => {
    return (
        <div>
            <label>{text} </label>
            <input
                value={value}
                id={id}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;
