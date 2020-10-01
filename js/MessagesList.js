class MessagesList extends React.Component {
    render() {
        const { messages } = this.props;

        return <>
            { messages.map((message, index) => (
                <Message user={message.user} message={message.message} key={index}/>
                ))}
        </>;
    }
}