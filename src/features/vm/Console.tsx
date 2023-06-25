import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const XTermComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    terminal.current = new Terminal();
    terminal.current.loadAddon(fitAddon.current);
    if (terminalRef.current) {
      terminal.current.open(terminalRef.current);
      fitAddon.current.fit();
    }
  }, []);

  // resize the terminal to fit its container whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (fitAddon.current) {
        fitAddon.current.fit();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // clean up the terminal instance on component unmount
  useEffect(() => {
    return () => {
      if (terminal.current) {
        terminal.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    terminal.current = new Terminal();
    terminal.current.loadAddon(fitAddon.current);
    if (terminalRef.current) {
      terminal.current.open(terminalRef.current);
      fitAddon.current.fit();
  
      terminal.current.writeln('Hello, world!');
  
      const socket = new WebSocket('ws://localhost:8081/ws');
      socket.onmessage = (event) => {
        if (typeof event.data === 'string' && terminal.current) {
          terminal.current.write(event.data);
        }
      };
  
      // close the WebSocket connection when the terminal is destroyed
      return () => socket.close();
    }
  }, []);

  return <div ref={terminalRef} />;
};

export default XTermComponent;
