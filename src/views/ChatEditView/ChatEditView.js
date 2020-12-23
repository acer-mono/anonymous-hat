import React from 'react';
import apiServices from '@/apiServices';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class ChatEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      error: '',
      result: null,
    };
  }

  validate() {
    this.setState({
      error: '',
    });
    if (this.state.title.length === 0) {
      this.setState({
        error: 'Введите новое название чата',
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    const chat = this.props.chat;
    chat.title = this.state.title;
    if (this.validate()) {
      apiServices.chat
        .edit(chat)
        .then(() => this.setState({ result: 'Название успешно изменено' }))
        .catch(error => this.setState({ error: 'Ошибка: ' + error.response.data.error }));
    }
  }

  render() {
    const { title, error, result } = this.state;
    return (
      <>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        {result ? <div className="alert alert-success">{result}</div> : null}
        <form className="mb-2" onSubmit={e => this.handleSubmit(e)}>
          <InputGroup className="form-sm form-1 pl-0">
            <InputGroup.Prepend>
              <Button variant="outline-success" type="submit">
                Edit
              </Button>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              placeholder="Enter chat name..."
              aria-label="Edit"
              value={title}
              onChange={event => this.setState({ title: event.target.value })}
            />
          </InputGroup>
        </form>
      </>
    );
  }
}
