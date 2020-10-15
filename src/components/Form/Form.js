import React from 'react';
import styles from './styles.modules.js.css';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            messsage: ''
        }
    }

    handleSend() {
        if (!this.state.user || !this.state.message) {
            return;
        }

        try {
            this.props.postMessage({
                user: this.state.user,
                message: this.state.message
            });

            this.setState({user: '', message: ''});
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        const { user, message } = this.state;
        return <>
        <form className={styles.formFields} onSubmit={(e) => e.preventDefault()}>
            <input id="nick"
                   name="nick"
                   value={ user }
                   className="form-control mb-4"
                   type="text"
                   placeholder="Your name..."
                   onChange={e => this.setState({user: e.target.value})}/>
            <textarea className="form-control mb-4"
                      value={ message }
                      id="message"
                      name="message"
                      rows="3"
                      placeholder="Your message..."
                      onChange={e => this.setState({message: e.target.value})}/>
            <input
                type="submit"
                className="btn btn-primary btn-block"
                id="send"
                value="Отправить"
                onClick={() => this.handleSend()}/>
        </form>
            </>
    }
}

export default Form;