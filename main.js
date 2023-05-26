const firebaseConfig = {
    apiKey: "AIzaSyDoH-ehrQfMsdtp2ew5aVd-wIj4B4iNbsM",
    authDomain: "site-da-escola-c9113.firebaseapp.com",
    databaseURL: "https://site-da-escola-c9113-default-rtdb.firebaseio.com",
    projectId: "site-da-escola-c9113",
    storageBucket: "site-da-escola-c9113.appspot.com",
    messagingSenderId: "651937307682",
    appId: "1:651937307682:web:22ca52e8a27105a7bbbe7b"
  };
  
  // Inicializar o Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Referência para o banco de dados do Firebase
  const database = firebase.database();
  
  // Objeto para representar a sala de bate-papo
  function ChatRoom(name) {
    this.name = name;
    this.users = [];
  }
  
  ChatRoom.prototype = {
    addUser: function(user) {
      this.users.push(user);
      console.log(`${user.name} entrou na sala de bate-papo ${this.name}.`);
    },
  
    removeUser: function(user) {
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
        console.log(`${user.name} saiu da sala de bate-papo ${this.name}.`);
      }
    },
  
    sendMessage: function(user, message) {
      console.log(`${user.name} na sala ${this.name}: ${message}`);
      // Salvar a mensagem no banco de dados do Firebase
      database.ref(`${this.name}/messages`).push({
        user: user.name,
        message: message
      });
    }
  };
  
  // Objeto para representar um usuário
  function User(name) {
    this.name = name;
  }
  
  // Exemplo de uso
  const sala1 = new ChatRoom("Sala 1");
  const sala2 = new ChatRoom("Sala 2");
  
  const user1 = new User("João");
  const user2 = new User("Maria");
  
  sala1.addUser(user1);
  sala1.addUser(user2);
  
  sala1.sendMessage(user1, "Olá, pessoal!");
  sala1.sendMessage(user2, "Oi, João!");
  
  sala1.removeUser(user2);
  