const express = require('express');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');
const csrf = require('csurf');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'secret', resave: false, saveUninitialized: true }));
app.use(csrf());

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Discord OAuth2 endpoints
const axios = require('axios');
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || 'http://localhost:3001/api/auth/callback';

app.get('/api/auth/discord', (req, res) => {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify email guilds',
  });
  res.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
});

app.get('/api/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');
  try {
    // Exchange code for token
    const tokenRes = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const accessToken = tokenRes.data.access_token;
    // Get user info
    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    req.session.user = userRes.data;
    // Optionally fetch guilds, email, etc.
    res.redirect('http://localhost:5173/dashboard'); // Redirect to dashboard after login
  } catch (err) {
    res.status(500).send('OAuth error');
  }
});

// Auth/session endpoint
app.get('/api/auth/session', (req, res) => {
  res.json(req.session.user || null);
});

// Bot management endpoints (to be implemented with real hosting logic)
app.post('/api/bot/start', (req, res) => {
  // TODO: Use req.session.user and req.body.token/appId to start bot
  io.emit('botStatus', { status: 'Online', uptime: '0m' });
  res.json({ success: true });
});
app.post('/api/bot/stop', (req, res) => {
  // TODO: Stop bot for user
  io.emit('botStatus', { status: 'Offline', uptime: '0m' });
  res.json({ success: true });
});
app.post('/api/bot/restart', (req, res) => {
  // TODO: Restart bot for user
  io.emit('botStatus', { status: 'Online', uptime: '0m' });
  res.json({ success: true });
});

// Admin endpoints (to be implemented with real DB)
app.get('/api/admin/users', (req, res) => {
  // TODO: Fetch users from real DB
  res.json([]);
});
app.post('/api/admin/grant-premium', (req, res) => {
  // TODO: Grant premium in real DB
  res.json({ success: true });
});

// Real-time updates
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
