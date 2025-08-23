FROM node:20

# Install system dependencies for Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    libnss3 \
    libnspr4 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libglib2.0-0 \
    libxrandr2 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Install Puppeteer browser
RUN npx puppeteer browsers install chrome

# Start app
CMD ["node", "index.js"]
