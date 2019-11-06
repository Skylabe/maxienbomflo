var socket = null;
import Vue from 'vue'
var app = new Vue({
	el :"#app",
    data :{
    	pseudo: '',
    	word: '',
    	roomName : '',
    	token : '',
    	debut_jeu : '',
    	tour : '',
    	word2Find : '',
    	mort : '',
    	password :'',
    	emptyPseudo : false,
    	emptyWord : false,
    	emptyRoom : false,
    	entrer_mot : [],
    	nouveau_salon : [],
    	liste_room : [],
    	liste_player : [],
    	log : []
    },

    methods :{
    	//Connexion de l'utilisateur
    	//Envoyer juste le pseudo au serveur et stocker dans une variable de session
    	session : function(){
    		console.log("ok");
    		if (this.pseudo != '' && this.password != ''){
    			this.emptyPseudo = false;
    			
	    		if (sessionStorage.getItem("autosave")) {
				  // Restauration du contenu de session
				  sessionStorage.clear();
				}
				// Enregistrement de la saisie utilisateur dans le stockage de session
				this.log.push(pseudo);
				this.log.push(password);
				sessionStorage.setItem("autosave", this.pseudo);
	    		socket.emit('connexion', this.log);
	    		this.pseudo = '';
	    		this.password = '';
	    		this.log = [];
	    	}
	    	else {
	    		console.log("ok");
	    		this.emptyPseudo = true;
	    	}
    	},

    	// Envoie du mot entrer par le user ainsi que son pseudo au serveur
    	sendMessage : function(){
    		if (this.word != ''){
    			this.emptyWord = false;
    			this.entrer_mot.push(token);
    			this.entrer_mot.push(word);
	    		socket.emit('entrer_mot', this.entrer_mot);
	    		this.entrer_mot = [];
	    		this.word = '';
    		}else{
    			this.emptyWord = true;
    			

    		}
    	},

    	newRoom : function(){
    		if (this.roomName != ''){
    			this.emptyRoom = false;
    			this.pseudo = sessionStorage.getItem();
    			this.nouveau_salon.push(pseudo);
    			this.nouveau_salon.push(roomName);
    			socket.emit('entrer_mot', this.entrer_mot);
    			this.pseudo = '';
	    		this.nouveau_salon = [];
	    		this.roomName = '';
    		}
    		else{
    			this.emptyRoom = true;
    		}
    	},

    	startGame : function(){
    		this.debut_jeu = token.split('_')[1];
    		socket.emit('debut_jeu', this.debut_jeu);
    	}
    },

    create : function(){
    	socket = io('192.8.94.235:8080')
    },
    mounted : function(){
    	socket.on('liste_salon', function(data){
    		app.liste_room.push(data);
    	})

    	socket.on('liste_joueur', function (data){
    		app.liste_player.push(data[0]);
    		app.token = data[1];
    	})

    	socket.on('trouve_mot', function (data){
    		app.tour = data [0];
    		app.word2Find = data [1];
    	})
    	socket.on('boom' , function(data){
    		app.liste_player.push(data[0]);
    		app.mort = data[1];
    	})
    },





});