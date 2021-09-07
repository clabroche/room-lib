import io from 'socket.io-client';

const socket = io(`${process.env.VUE_APP_SERVER_URL}`);

export default {
  socket,
}