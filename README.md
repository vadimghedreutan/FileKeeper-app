## File Keeper - A Next.js App with CRUD, Drag & Drop and Authentication

This project is a React application built with Next.js 14 that utilizes various technologies to provide a rich user experience.

### Tech Stack:

-   Frontend: React, Next.js 14
-   Authentication: Clerk
-   Shadcn/ui
-   Database: Firebase
-   Features: Drag & Drop, CRUD Operations (Create, Read, Update, Delete)
-   Type Safety: TypeScript

### Getting Started:

1. Clone the Repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

2. Install Dependencies:

```bash
cd your-repo-name
npm install
```

3. Configure Firebase:

-   Create a Firebase project and enable the necessary services (Firestore, Authentication, Storage - if needed).
-   Create a .env.local file at the root of the project and add your Firebase project configuration details. See the Firebase documentation for details on setting up environment variables: https://firebase.google.com/docs/functions/config-env

4. Configure Clerk (Optional - if using Clerk):

-   Create a Clerk application and configure it in your project. Refer to the Clerk documentation for specific instructions: https://clerk.com/docs/quickstarts/setup-clerk

5. Start the Development Server:

```bash
npm run dev
```

This will start the development server and your application will be accessible at [http://localhost:3000](http://localhost:3000) by default.
