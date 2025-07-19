import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const CLIENT_ID = process.env.CLIENTID;
const CLIENT_SECRET = process.env.CLIENTSECERT;
const REDIRECT_URI = `${process.env.REDIRECTURI}/auth/discord/callback`;
const JWT_SECRET = process.env.SUPER_SECRET_JWT_KEY;
const FRONTEND_URL = process.env.FRONTENDURL;

const DISCORD_API_BASE = 'https://discord.com/api/v10';
const DISCORD_AUTH_URL = 'https://discord.com/oauth2/authorize';
const DISCORD_TOKEN_URL = `${DISCORD_API_BASE}/oauth2/token`;
const DISCORD_USER_URL = `${DISCORD_API_BASE}/users/@me`;

export async function AuthorizeURL(req, res) {
  const scopes = ["identify", "email"].join(" ");
  const authorizeUrl = `${DISCORD_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&prompt=consent`;
  res.redirect(authorizeUrl);
}

export async function CallbackURL(req, res) {
  const code = req.query.code;
  const error = req.query.error;

  if (error) {
    console.error("Discord OAuth Error:", error);
    return res.redirect(
      `${FRONTEND_URL}/login?error=${encodeURIComponent(error)}`
    );
  }

  if (!code) {
    return res.status(400).json({ error: "No authorization code provided." });
  }

  try {
    const tokenResponse = await fetch(DISCORD_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: "identify email",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Error exchanging code for token:", errorData);
      return res
        .status(tokenResponse.status)
        .json({ error: "Failed to get access token.", details: errorData });
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    const userResponse = await fetch(DISCORD_USER_URL, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error("Error fetching user data:", errorData);
      return res
        .status(userResponse.status)
        .json({ error: "Failed to fetch user data.", details: errorData });
    }

    const userData = await userResponse.json();
    const payload = {
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar,
      email: userData.email,
    };

    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
    res.redirect(`${FRONTEND_URL}/login?token=${authToken}`);
  } catch (error) {
    console.error("Server error during Discord OAuth callback:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export default {
  AuthorizeURL,
  CallbackURL,
};