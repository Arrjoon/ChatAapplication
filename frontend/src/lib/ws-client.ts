import { getAccessToken } from "./auth-token";

export class WSClient {
  private socket: WebSocket | null = null;
  private onMessageCallback: ((data: any) => void) | null = null;

  constructor(private roomId: string) {
    this.connect();
  }

  onMessage(callback: (data: any) => void) {
    this.onMessageCallback = callback;
  }

  private connect() {
    const token = getAccessToken();
    const url = `ws://localhost:8000/ws/chat/${this.roomId}/?token=${token}`;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => console.log("WS connected");

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.socket.onclose = () => {
      console.log("WS disconnected → reconnecting...");
      setTimeout(() => this.connect(), 1000);
    };
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }
}
