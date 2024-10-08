# OC_P14_HRnet

## Project Overview
This project is part of my OpenClassrooms training as a front-end developer. The goal of this project is to convert an existing jQuery-based internal HR management application (HRnet) into a fully functional and optimized React application. This application is used by WealthHealth to manage employee records.

The key objectives are:

1. **Phase 1: Full React Conversion**
Replace the jQuery-based HRnet application with a React version, while maintaining its functionality and improving performance.

2. **Phase 2: jQuery Plugin Replacement**
Convert or replace outdated jQuery plugins for date selection, modals, dropdowns, and tables with custom or third-party React components.

## Features
- **Employee Creation**: Users can add new employees to the database by filling out a form.
- **Employee List**: A table displaying all employees, with options to sort and filter the data.
- **Custom Components**: Custom-built React components to replace old jQuery plugins (for dropdowns, modals, and tables).
- **Third-Party Date Picker**: Integrated a React-based date picker component from npm for better performance.
- **State Management with Redux**: Centralized state management using Redux for employee data.
- **Responsive Design**: The application is fully responsive, providing a good user experience on all device sizes.

## Tech Stack

- **React**
- **Redux**: For state management.
- **HTML/CSS**
- **JavaScript/TypeScript**: Ensuring type safety and better  developer experience.
- **React DataTable Component**: Custom-built DataTable component published on npm, used in the Employee List page.
- **npm/yarn**: For managing dependencies.

## Installation

### Prerequisites

Ensure you have the following installed on your system:
- **npm** or **yarn** for package management

### Steps to Install

1. **Clone the repository**:

```bash
git clone https://github.com/flafonso/OC_P14_HRnet.git
cd OC_P14_HRnet
```

2. **Install dependencies**:
```bash
npm install
# or if you're using yarn
yarn install
```

3. **Run the application**:
```bash
npm run dev
# or
yarn dev
```

## How to Use the Application
1. **Create Employee**
Navigate to the "Create Employee" page to fill out the form and add a new employee. The form includes fields for basic information such as name, date of birth (using the integrated React date picker), department, and address.

2. **View Employee List**
Once an employee is created, they will appear in the "Employee List" table. You can sort and filter the data using **react-datatable-component**, a custom React table component published on npm, which replaces the old jQuery DataTables plugin.