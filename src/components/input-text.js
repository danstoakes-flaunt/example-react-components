import React from "react";

class InputText extends React.Component
{
    constructor ()
    {
        super();

        this.state = {
            message: ""
        }
        this.handleInput = this.handleInput.bind(this);
    }

    processPassword (password, minlength, maxlength, match)
    {
        const hasInteger = this.props.hasInteger;
        const hasPunctuation = this.props.hasPunctuation;

        var messages = [];
        if (hasInteger && password.search(/[0-9]/) < 0)
            messages.push("Must contain an integer");

        if (hasPunctuation && password.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) < 0)
            messages.push("Must contain a special character");

        if (match)
        {
            var matchElement = document.getElementById(match);
            if (matchElement && typeof matchElement !== null)
            {
                if (password !== matchElement.value)
                    messages.push("Fields must match");
            }
        }

        if (password.length < minlength)
        {
            messages.push("Please enter at least " + minlength + " characters");
        } else if (password.length > maxlength)
        {
            messages.push("Please enter less than " + maxlength + " characters");
        }

        return messages[0];
    }

    processText (text, minlength, maxlength)
    {
        var message = this.state.message;

        if (text.length < minlength)
        {
            message = "Please enter at least " + minlength + " characters";
        } else if (text.length > maxlength)
        {
            message = "Please enter less than " + maxlength + " characters";
        } else
        {
            message = "";
        }

        return message;
    }

    handleInput (event)
    {
        var message = this.state.message;
        let targetElement = event.target;

        if (targetElement && typeof targetElement !== "undefined")
        {
            let value = targetElement.value;
            let type = targetElement.getAttribute("type");

            switch (type)
            {
                case "password":
                    message = this.processPassword(
                        value, targetElement.getAttribute("input-min-length"), targetElement.getAttribute("input-max-length"), targetElement.getAttribute("input-match"));
                    break;
                case "text":
                    message = this.processText(
                        value, targetElement.getAttribute("input-min-length"), targetElement.getAttribute("input-max-length"));
                    break;
            }
        }

        this.setState({
            message: message
        });
    }

    inputElement (props)
    {
        const name = props.name;
        const placeholder = props.placeholder;
        const type = props.type;

        switch (type)
        {
            case "password":
                return (
                    <div className="input-wrapper">
                        <input
                            type={ type } 
                            name={ name } 
                            placeholder={ placeholder } 
                            onChange={ this.handleInput } 
                            input-min-length={ 5 }
                            input-max-length={ 50 }
                            input-match={ props.match }
                        />
                        <span>{ this.state.message }</span>
                    </div>
                );
            case "text":
                return (
                    <div className="input-wrapper">
                        <input
                            type={ type } 
                            name={ name } 
                            placeholder={ placeholder } 
                            onChange={ this.handleInput } 
                            input-min-length={ 5 }
                            input-max-length={ 50 }
                        />
                        <span>{ this.state.message }</span>
                    </div>
                );
            case "textarea":
                return (
                    <div className="input-wrapper">
                        <textarea
                            name={ name } 
                            placeholder={ placeholder } 
                            onChange={ this.handleInput }
                        ></textarea>
                        <span>{ this.state.message }</span>
                    </div>
                );
        }
    }

    render ()
    {
        return (
            <div className="input-">
                <label className="">Label</label>
                { this.inputElement(this.props) }
            </div>
        );
    }
}

export default InputText;