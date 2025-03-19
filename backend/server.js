require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permet de recevoir des données en JSON

// Connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Route pour récupérer tous les utilisateurs
app.get('/infos', (req, res) => {
    db.query('SELECT * FROM info_card', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});
// Route pour récupérer tous les utilisateurs
app.get('/student', (req, res) => {
    db.query('SELECT * FROM student_card', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});
// Route pour récupérer tous les utilisateurs
app.get('/candidacy', (req, res) => {
    db.query('SELECT * FROM candidacy_card', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur Node.js en cours d'exécution sur http://localhost:${PORT}`);
});
