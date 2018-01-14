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
    this.outputText = "";

  }

    convert() {
      var inputText = document.querySelector('#input').value;
  
      var lines = inputText.split(/\n/);
  
      var question = null;
      var answerLines = [];
      var outputLines = [];
      for(var i=0; i<lines.length; i++) {
        var line = lines[i].replace('\t', ' ');
        if(line.startsWith('Q:')) {
          if(i!=0) {
            outputLines.push(`${question}\t${answerLines.join('<br>')}`);
            answerLines=[];
          }
          question=line.substring(2);
        }
        else {
          answerLines.push(line);
        }
      }
      outputLines.push(`${question}\t${answerLines.join('<br>')}`);
  
  
      this.outputText = outputLines.join('\n');
      document.querySelector('#output').innerHTML=`<xmp>${this.outputText}</xmp>`;
    }


  downloadQA() {
    var output = document.querySelector('#output').textContent;
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
        <textarea id='input'></textarea>
        <div>
          <button id='convert' onClick={this.convert}>Convert</button>
          <button id='download' onClick={this.downloadQA}>Download</button>
        </div>
        <div id='output'></div>
      </div>
    );
  }
}

export default App;
