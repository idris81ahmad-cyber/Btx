# BIYORA

African luxury textiles e-commerce app.

Built with Next.js for a storefront selling fabrics, Ankara, Adire, and textile designs.

## Features

- Cart system with Zustand and localStorage persistence
- Paystack payment integration
- Product detail modals with quantity selection
- Form validation for email, phone, and cart items
- Dark theme UI with gold accents
- Accessibility support (ARIA labels and live regions)

## Tech Stack

- Next.js 14.2.15
- React 18.3.1
- TypeScript
- Tailwind CSS
- Zustand
- Paystack

## Quick Start

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd biyora
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment variables
   ```bash
   cp .env.example .env.local
   ```
   Add your Paystack API keys and other configuration

4. Run the development server
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. Build for production
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── public/              # Static assets
├── styles/              # Global styles
├── store/               # Zustand store configuration
└── utils/               # Utility functions
```

## Environment Variables

Required environment variables in `.env.local`:

```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
