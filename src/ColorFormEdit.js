import React, { Component } from "react";
import { connect } from "react-redux";
import { updateColor, destroyColor } from "./store";

class _ColorFormEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      error: "",
    };
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setState({ name: this.props.color.name });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.color.id && this.props.color.id) {
      this.setState({ name: this.props.color.name });
    }
  }

  

  async save(ev) {
    ev.preventDefault();
    const color = {
      name: this.state.name,
      id: this.props.color.id,
    };
    try {
      await this.props.update(color);
    } catch (ex) {
      this.setState({ error: ex.response.data });
    }
  }

  render() {
    const { name, error } = this.state;
    const { save } = this;
    return (
      <div>
        <form onSubmit={save}>
          <input
            value={name}
            onChange={(ev) => this.setState({ name: ev.target.value })}
          />
          <button disabled={!name || this.props.color.name === name}>
            save
          </button>
          {error ? <pre>{JSON.stringify(error, null, 2)}</pre> : null}
        </form>
        <button onClick={() => this.props.destroy(this.props.color)}>Delete</button>
      </div>
    );
  }
}

const mapState = ({ colors }, otherProps) => {
  const id = otherProps.match.params.id;
  const color = colors.find((color) => color.id === id * 1) || { name: "" };
  return {
    color,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    update: (color) => dispatch(updateColor(color, history)),
    destroy: (color) => dispatch(destroyColor(color, history)),
  };
};

const ColorFormEdit = connect(mapState, mapDispatch)(_ColorFormEdit);

export default ColorFormEdit;
