# Visionary - Your Personal Eye Health Companion

Visionary is a comprehensive web application built to help you monitor and take care of your eye health. Developed with Next.js, React, and ShadCN UI, it provides a suite of tools and educational resources to empower you to be proactive about your vision.

## Features

- **Dashboard:** A central hub providing easy access to all application features.
- **Amsler Grid Test:** A simple, interactive test to monitor your central vision for distortions or blind spots, which can be early signs of retinal problems like macular degeneration.
- **Medication Reminders:** Set and manage reminders for eye drops and other medications to ensure you stay on schedule with your treatment.
- **Eye Strain Relief Exercises:** Follow guided, real-time exercises designed to reduce eye fatigue from prolonged screen time. Includes popular techniques like the 20-20-20 rule, focus changes, and palming.
- **Symptom Checker:** A guided search tool that helps you find reliable information about eye-related symptoms from trusted sources like Google, PubMed, the CDC, and the WHO. This feature empowers you with quality information but does not provide a medical diagnosis.
- **Educational Content:** Browse a library of articles on general eye care and learn about common eye conditions such as cataracts, glaucoma, and diabetic retinopathy.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) with a CI/CD pipeline using GitHub Actions.

## Getting Started

To run this project locally, you will need Node.js and npm installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd visionary-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## Deployment

This application is configured for continuous deployment to Firebase App Hosting. Any push to the `main` branch will automatically trigger a GitHub Actions workflow to build and deploy the latest version of the app.
