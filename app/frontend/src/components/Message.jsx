const Message = ({ message, isError }) => {
    if (message === null) {
        return null;
    }
    return (
        <div className={`message ${isError ? "error" : "success"}`}>
            {message}
        </div>
    )
}

export default Message;