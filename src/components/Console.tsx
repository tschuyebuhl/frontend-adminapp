import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const XTermComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());
  const socket = useRef<WebSocket | null>(null);
  const commandBuffer = useRef('');

  useEffect(() => {
    terminal.current = new Terminal();
    terminal.current.loadAddon(fitAddon.current);

    socket.current = new WebSocket('ws://localhost:8081/console');
    
    socket.current.onopen = () => {
      if (terminalRef.current) {
        terminal.current?.open(terminalRef.current);
        fitAddon.current.fit();
    
        terminal.current?.onKey(({ key }) => {
          terminal.current?.write(key);
          if (key === '\r') {
            socket.current?.send(commandBuffer.current);
            commandBuffer.current = '';
          } else if (key === '\u007F') {
            // Handle backspace
            commandBuffer.current = commandBuffer.current.slice(0, -1);
            terminal.current?.write("\b \b");
          } else {
            commandBuffer.current = commandBuffer.current + key;
          }
        });

        if (socket.current) {
          socket.current.onmessage = (event) => {
            if (typeof event.data === 'string') {
              terminal.current?.write(event.data);
            } else {
              event.data.text().then((text: string) => {
                terminal.current?.write(text);
              });
            }
          };
      }
    }
    };
    
    // close the WebSocket connection when the terminal is destroyed
    return () => {
      socket.current?.close();
      terminal.current?.dispose();
    };
  }, []);

  // resize the terminal to fit its container whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      fitAddon.current?.fit();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />;
};

export default XTermComponent;