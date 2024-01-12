import React, { useRef, useEffect } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';


const Terminal = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const term = new XTerm({
      theme:{
        "foreground": "#ebeef5",
        "background": "#1d2935",
        "cursor": "#e6a23c",
        "black": "#000000",
        "brightBlack": "#555555",
        "red": "#ef4f4f",
        "brightRed": "#ef4f4f",
        "green": "#67c23a",
        "brightGreen": "#67c23a",
        "yellow": "#e6a23c",
        "brightYellow": "#e6a23c",
        "blue": "#409eff",
        "brightBlue": "#409eff",
        "magenta": "#ef4f4f",
        "brightMagenta": "#ef4f4f",
        "cyan": "#17c0ae",
        "brightCyan": "#17c0ae",
        "white": "#bbbbbb",
        "brightWhite": "#ffffff"
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.prompt = () => {
      term.write('\r\n$ ');
    };
    term.open(terminalRef.current);
    fitAddon.fit();
    
    term.writeln('Welcome to Soory Resume Terminal');
    term.writeln('')
    term.writeln('')
    term.writeln('------------------');
    term.writeln('Summary:');
    term.writeln('------------------');
    term.writeln('• 4+ years of combined production development in backend and frontend');
    term.writeln('• Programming Languages: HTML, CSS, Python, Java, JavaScript, C++ (CMake), SQL, Golang, C, NodeJS')
    term.writeln('• Testing Frameworks: Jest, Cypress, Selenium, Cucumber, Mocha, Chai')
    term.writeln('• Frameworks: Vue.js, React, .NET, Node.js, echo (golang)')
    term.writeln('• Technical Skills: Regression/Integration testing, Automation, Test Plans/Cases, Debugging, Analyzing')
    term.writeln('• Soft Skills: Communication, Team Collaboration, Problem Solving, and Analytical Thinking')
    term.writeln('')
    term.writeln('')

    term.writeln('Type "help" for a list of commands');
    term.prompt();

    term.onKey(({key, domEvent}) => {
      const ev = domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
  
      if (ev.key === 'Enter') {
        term.writeln("");
        term.writeln("");
        const command = term.buffer.active.getLine(
          term.buffer.active.cursorY + term.buffer.active.baseY
        ).translateToString(true).trim().substring(2);
        
        processCommand(command, term);
        term.prompt();
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
        displayHelp(term);
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

  const displayHelp = (term) => {
    term.writeln('------------------');
    term.writeln('Built-in Commands');
    term.writeln('------------------');
    term.writeln('about, education, projects, experience, skills, contact, download');
  }

  const displayExperience = (term) => {
    term.writeln('------------------');
    term.writeln('Experience:');
    term.writeln('------------------');
    term.writeln('Software Engineer at RFRL (2022-Present)');
    term.writeln('Software Engineer Intern at Fast (2021-2022)');
    term.writeln('Software Engineer Intern at Sybase iAnywhere (2020-2021)');
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
