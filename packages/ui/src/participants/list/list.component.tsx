import React from "react";
import "./list.component.scss";
import { IPerson } from "../../../../model/person.model";
import { Api } from "../../app/api";
import { Participant } from "../participant/participant.component";
import { MdPlusOne } from "react-icons/md";
import { KeyboardLayout } from "../../../../model/keyboard.enum";

const styles = {
  formInput: {
    flex: "auto",
    boxSizing: "border-box" as any,
    padding: "8px"
  },
  formSubmitButton: {
    flex: "1",
    maxWidth: "30px",
    background: "#eee"
  },
  form: {
    margin: "10px",
    flex: "auto",
    minHeight: "30px",
    maxHeight: "30px",
    display: "flex"
  }
};

export class Participants extends React.Component<any, any> {
  private api = new Api();
  public state: Partial<{ name: string, layout: KeyboardLayout}> = {};

  render() {
    return (
      this.props &&
      this.props.data && (
        <div className="persons">
          {this.props.data.map((person: any, i: number) => (
            <Participant
              person={person}
              onDelete={this.props.onDelete}
              onDriverPromotion={this.props.onDriverPromotion}
            />
          ))}
          <div style={styles.form}>
            <input
              id="inputField"
              style={styles.formInput}
              type="text"
              placeholder="New participant"
              onKeyPress={this.handleFormKeydown}
              onChange={this.handleFormChange}
              value={this.state.name}
            />
            <button
              style={styles.formSubmitButton}
              type="button"
              onClick={this.handleFormSubmit}
            >
              <MdPlusOne />
            </button>
          </div>
        </div>
      )
    );
  }

  private handleFormKeydown = (e: any) => {
    if (e.key.toLowerCase() !== "enter") {
      return;
    }
    this.handleFormSubmit();
  };

  private handleFormSubmit = () => {
    const newParticipant: IPerson = {
      name: this.state.name || '',
      language: "Swedish-Pro" as any,
      scroll: "Natural" as any
    };
    this.setState({ name: "" });
    this.api.add(newParticipant);
  };

  private handleFormChange = (e: any) => {
    this.setState({
      ...this.state,
        name: e.target.value,
        layout: this.state.layout
      });
  };
}
