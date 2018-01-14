import React, { Component } from 'react';
import './App.css';

var download = function(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      outputText: ""
    };

  }

    convert = () => {
      var inputText = document.querySelector('#input').value;
  
      var lines = inputText.split(/\n/);
      if(lines.length<2 || !lines[0].startsWith('Q:')) {
        alert('Error format!');
        this.setState({ outputText: ''});
        return;
      }
  
      var question = null;
      var answerLines = [];
      var outputLines = [];
      for(var i=0; i<lines.length; i++) {
        var line = lines[i].replace('\t', ' ');
        if(line.startsWith('Q:')) {
          if(i!=0) {
            while (answerLines[answerLines.length-1]=="") {
              answerLines.pop();
            }
            outputLines.push(`${question}\t${answerLines.join('<br>')}`);
            answerLines=[];
          }
          question=line.substring(2).trim();
        }
        else {
          answerLines.push(line);
        }
      }
      while (answerLines[answerLines.length-1]=="") {
        answerLines.pop();
      }
      outputLines.push(`${question}\t${answerLines.join('<br>')}`);
  
  
      this.setState({ outputText: outputLines.join('\n')});
    }


  downloadQA = () => {
    var output = this.state.outputText;
    if(output.length==0) {
      alert('No data available!');
    }
    else {
      download("AnkiQA.txt", output);
    }
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="input">Input QA Text:</label>
        <textarea id='input' rows='10' className='form-control'></textarea>
        <div className='form-group'>
          <button id='convert' onClick={this.convert.bind(this)}>Convert</button>
          <button id='download' onClick={this.downloadQA.bind(this)}>Download</button>
        </div>
        { this.state.outputText.length > 0 &&
        <div id='output'>
          <label>Formated Text:</label>
          <br/>
          <pre>
            {this.state.outputText}
            </pre>
        </div>
        }
      </div>
    );
  }
}

export default App;
