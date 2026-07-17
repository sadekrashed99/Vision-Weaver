import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

  // API Routes
  app.post('/api/create-checkout-session', async (req, res) => {
    try {
      const { email, firstName, leadScore, leadTemperature, sessionId } = req.body;

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${PORT}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: process.env.STRIPE_PRICE_ID || 'price_123', quantity: 1 }],
        mode: 'payment',
        customer_email: email,
        metadata: { firstName, leadScore: String(leadScore), leadTemperature, sessionId },
        success_url: `${baseUrl}/vision-weaver/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/?step=payment`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
