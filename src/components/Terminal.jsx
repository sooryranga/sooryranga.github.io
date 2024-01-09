import React, { useRef, useEffect } from 'react';
import { Terminal as XTerm } from 'xterm';
import 'xterm/css/xterm.css';

const Terminal = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new XTerm();
    term.open(terminalRef.current);
    term.writeln('Welcome to My Resume Terminal');
    term.writeln('Type "help" for a list of commands');

    term.onKey(({key, domEvent}) => {
      const ev = domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
  
      if (ev.key === 'Enter') {
        term.writeln();
        const command = term.buffer.active.getLine(term.buffer.active.cursorY - 1).translateToString(true).trim();
        processCommand(command, term);
      } else if (ev.key === 'Backspace') {
        // Do not delete the prompt
        if (term._core.buffer.x > 0) {
          term.write('\b \b');
        }
      } else if (printable) {
        term.write(key);
      }
    });

    // Cleanup
    return () => term.dispose();
  });

  const processCommand = (command, term) => {
    switch (command) {
      case 'help':
        term.writeln('Commands: about, experience, skills, education, contact');
        break;
      case 'experience':
        displayExperience(term);
        break;
      case 'education':
        displayEducation(term);
        break;
      case 'skills':
        displaySkills(term);
        break;
      default:
        term.writeln(`Command not found: ${command}`);
    }
  };

  const displayExperience = (term) => {
    term.writeln('Experience:');
    term.writeln('Software Engineer at XYZ Corp (2021-Present)');
    term.writeln('Junior Developer at ABC Inc (2019-2021)');
    // Add more experiences as needed
  };

  const displayEducation = (term) => {
    term.writeln('Education:');
    term.writeln('B.S. in Computer Science, University of Somewhere (2017-2021)');
    // Add more education details as needed
  };

  const displaySkills = (term) => {
    term.writeln('Skills:');
    term.writeln('Programming Languages: JavaScript, Python, Java');
    term.writeln('Frameworks: React, Node.js, Spring Boot');
    // Add more skills as needed
  };

  return (
    <div ref={terminalRef} style={{ height: '100%', width: '100%' }}></div>
  );
};

export default Terminal;
