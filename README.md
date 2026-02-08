# [Country rank](https://country-rank.bastiendmt.vercel.app/)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bastiendmt_country-rank&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bastiendmt_country-rank)[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bastiendmt_country-rank&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bastiendmt_country-rank)[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bastiendmt_country-rank&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bastiendmt_country-rank)

This website displays countries in list and details about a country such as its population, languages, neighbors...

## Features

- fetching countries from an [API](https://restcountries.com)
- responsive layout
- search
- filter by country, region
- dark mode
- [random country](https://country-rank.bastiendmt.vercel.app/country/random) _using middleware or button_
- language switch (en & fr)
- SEO optimized with metadata
- Incremental Static Regeneration (ISR) for better performance
- Accessibility features (ARIA labels, semantic HTML)

## Tech stack

This project is using NextJS with app router and the following :

- Bun (package manager and runtime)
- Lucide icons
- Mapbox
- Eslint
- TypeScript
- Next Themes (dark mode)

Data is coming from https://restcountries.com

The site is deployed on vercel

## Preview

**Countries list**
![Countries list](/preview/list.png)

**Country details**
![Country detail](/preview/country-info.png)

**Performance**
![Performance](/preview/performances.png)

## About

This project was made with of tutorial made by [Thu Nghiem](https://github.com/nghiemthu)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the project locally, run the development server as following:

```bash
bun i
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `bun dev` - Starts the development server
- `bun run build` - Builds the application for production
- `bun start` - Starts the production server
- `bun lint` - Runs ESLint to check code quality
- `bun run format` - Formats code using Prettier
- `bun run typecheck` - Runs TypeScript type checking

## Project Structure

```
src/
├── api/              # API functions for fetching data
├── app/              # Next.js app router pages
│   └── [lang]/       # Internationalized routes
├── components/       # React components
├── functions/        # Utility functions
├── hooks/            # Custom React hooks
├── styles/           # CSS modules
└── types/            # TypeScript type definitions
```

## Environment Variables

See `.env.example` for available environment variables. Currently supports:

- `NEXT_PUBLIC_API_URL` - Override the REST Countries API URL (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
