# Job Board Web Application

[![Issues](https://img.shields.io/github/issues/usc-tl083/JobBoardWebApp.svg)](https://github.com/usc-tl083/JobBoardWebApp/issues)

## Table of Contents

- [Introduction](#introduction)

- [Features](#features)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)

  - [Configuration](#configuration)

- [Usage](#usage)

- [Contact](#contact)

## Introduction

The Job Board Web Application is a full-stack web application designed to facilitate job seekers and employers in connecting effectively. Job seekers can browse job postings, apply for jobs, and manage their applications, while employers can post job listings and manage applicants.

## Features

### Front-end

- **React** for building user interfaces

- **Vite** for fast development and optimized build processes

- **CSS Modules** and **Tailwind CSS** for styling

- **React Router** for navigation

### Back-end

- **Node.js** and **Express.js** for server-side development

- **PostgreSQL** with Docker for database management

### CI/CD Pipeline

- **GitHub Actions** for automated testing, linting, and deployment

## Getting Started

### Prerequisites

- Node.js >= 14.x

- Docker

### Installation

1. Clone the repository:

   ```bash

   git clone https://github.com/usc-tl083/JobBoardWebApp.git

   cd JobBoardWebApp

   ```

2. Install dependencies:

   ```bash

   npm install

   cd server

   npm install

   cd ../client

   npm install

   ```

### Configuration

1. Create `.env` files in both the `client` and `server` directories using the provided `.env.sample` files.

2. Update the `.env` files with your configuration.

### Running the Application

1. Start the PostgreSQL database using Docker:

   ```bash

   docker-compose up

   ```

2. Run both client and server concurrently:

   ```bash

   npm run dev

   ```

## Usage

### Endpoints

- **/auth/login**: User authentication

- **/auth/signup**: Create a new user

- **/auth/reset-password**: Reset user password

- **/job-postings**: Get all job postings

- **/job-postings** (POST): Create a new job posting

- **/job-postings/apply**: Apply for a job

- **/job-postings/get-user-applications**: Get user's job applications

- **/job-postings/{id}**: Get detailed job posting

- **/job-postings/{id}** (DELETE): Delete a job posting

## Contact

For any questions or feedback, please contact [t_l083@student.usc.edu.au](mailto:t_l083@student.usc.edu.au).
