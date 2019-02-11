/**
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

/**
 * temporary stubs required for React.
 * These will not be required as soon as the XD environment provides setTimeout/clearTimeout
 * DO THIS SHIM STUB before you call const React = require("react");
 */

const reactShim = require('./react-shim');
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const { Color, Text } = require('scenegraph');
const style = require('./styles.css');
const { findTextPositions, updateStyleBlocks } = require('./textStyleModifier');

let dialogInstance;

const modifyStyleRanges = (textNode, textPositions) => {
  console.log("Original Text Style Ranges", textNode.styleRanges);
  const newTextStyleRanges = updateStyleBlocks(textNode.styleRanges, textPositions);

  console.log("Updated Text Style Ranges", newTextStyleRanges);
  return newTextStyleRanges;
};

const emboldenText = (selection, textToEmbolden) => {
  // iterate over all Text elements in the selection and find the text to embolden
  console.log(selection);
  selection.items.filter(item => item instanceof Text).forEach((textNode) => {
    const textPositions = findTextPositions(textNode.text, textToEmbolden);
    textNode.styleRanges = modifyStyleRanges(textNode, textPositions);
  });
};

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textToBolden: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ textToBolden: e.target.value });
  }

  onCancelButtonClick(e) {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();

    const { dialog } = this.props;
    dialog.close('cancelButton');
  }

  async onSubmitButtonClick(e) {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    e.preventDefault();
    console.log('submitButton');
    const { selection, dialog } = this.props;
    const { textToBolden } = this.state;
    emboldenText(selection, textToBolden);
    dialog.close('submit');
  }

  onSubmit(e) {
    // TODO
    // Call e.preventDefault()
    // otherwise, dialog.close() is called with nothing; will fix docs
    // NOT working yet.
    e.preventDefault();
    // console.log('submitEvent');
    const { selection, dialog } = this.props;
    const { textToBolden } = this.state;
    emboldenText(selection, textToBolden);
    dialog.close('submit');
  }

  render() {
    const { textToBolden } = this.state;

    return (
      <form style={{ width: 200 }} onSubmit={this.onSubmit}>
        <h1>XD-Bold-It</h1>
        <label htmlFor="searchText">
          <span>Text to Em-Bolden</span>
          <input type="text" onChange={this.onInputChange} id="searchText" />
        </label>
        <footer>
          <button type="button" uxp-variant="primary" onClick={this.onCancelButtonClick}>Cancel</button>
          <button type="submit" uxp-variant="cta" onClick={this.onSubmitButtonClick}>Em-Bolden!</button>
        </footer>
      </form>
    );
  }
}

function initializeDialog(selection) {
  //  create the dialog
  const dialogNode = document.createElement('dialog');
  ReactDOM.render(<MessageForm dialog={dialogNode} selection={selection} />, dialogNode);
  return dialogNode;
}

async function getDialog(selection) {
  if (dialogInstance == null) {
    dialogInstance = initializeDialog(selection);
  }
  try {
    document.body.appendChild(dialogInstance);
    // use async await until submit/close the dialog
    return await dialogInstance.showModal();
  } catch (e) {
    return e;
  } finally {
    dialogInstance.remove();
  }
}

async function main(selection, documentRoot) {
  // find all text
  // search for the specific search string
  // if found, make it bold

  const response = await getDialog(selection);
  // check how was the dialog submitted/closed
  if (response === 'reasonCanceled') {
    console.log('Dialog dismissal by pressing ESC Key');
  } else if (response === 'submit') {
    console.log('Dialog closed by pressing Submit button');
  }
}

module.exports = {
  commands: {
    menuCommand: main,
  },
};

// Specifies the default values for props:
MessageForm.defaultProps = {
  dialog: document.createElement('dialog'),
  selection: PropTypes.object,
};

MessageForm.propTypes = {
  dialog: PropTypes.object,
  selection: PropTypes.object,
};
