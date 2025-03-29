Sales Data API
The Sales Data API is a RESTful API built with NestJS to help manage and analyze sales data efficiently. It provides endpoints for calculating total revenue, filtering by product, category, and region, and generating revenue trends over time.

This README provides detailed instructions on how to set up, use, and explore the API.

Table of Contents
Overview

Features

Technologies Used

Installation

Usage

API Endpoints

Postman Collection

Contributing

License

Overview
The Sales Data API is designed to help businesses analyze their sales data effectively. Whether you need to calculate total revenue, filter sales by products or regions, or observe revenue trends over time, this API provides robust functionality to meet your needs.

It is built using NestJS, a progressive framework for building scalable server-side applications, and uses PostgreSQL for data storage.

Data Loading
To load data from a CSV file, use the following endpoint:

text
localhost:3000/data-loader/load-data?fileName=data.csv
A cron job runs daily at 2 AM to update the data from the CSV file to the database.

Features
Total Revenue Calculation: Compute total revenue within a specified date range.

Filter by Product: Retrieve revenue data filtered by specific products.

Filter by Category: Analyze revenue based on product categories.

Filter by Region: View revenue data segmented by geographic regions.

Revenue Trends: Generate monthly or yearly revenue trends over a specified date range.

Technologies Used
This project leverages the following technologies:

NestJS: Framework for building efficient and scalable server-side applications.

TypeORM: ORM for TypeScript and JavaScript that supports multiple databases.

PostgreSQL: Relational database system used for storing sales data.

Swagger: Tool for documenting APIs.

Postman: Used for testing and sharing API requests.

Installation
Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)

npm (Node Package Manager)

PostgreSQL database

Steps to Install
Clone the repository:

bash
git clone https://github.com/sagarvaghela4041/sales-data-api.git
Navigate to the project directory:

bash
cd sales-data-api
Install dependencies:

bash
npm install
Set up environment variables:
Create a .env file in the root directory with the following configuration:

text
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=sales_data
Start the application:

bash
npm run start:dev
Usage
Once the application is running, you can access it at http://localhost:3000. Use tools like Postman or curl to interact with the API endpoints.

Swagger Documentation
The API documentation is available at:

text
{base_path}/api-docs
For local development, this will typically be:

text
http://localhost:3000/api-docs
Swagger provides detailed information about all available endpoints, their parameters, and expected responses.

API Endpoints
1. Total Revenue Calculation
Endpoint: GET /revenue/total

Query Parameters:

startDate: Start date for revenue calculation (YYYY-MM-DD).

endDate: End date for revenue calculation (YYYY-MM-DD).

2. Total Revenue by Product
Endpoint: GET /revenue/by-product

Query Parameters:

startDate: Start date for calculation.

endDate: End date for calculation.

3. Total Revenue by Category
Endpoint: GET /revenue/by-category

Query Parameters:

startDate: Start date for calculation.

endDate: End date for calculation.

4. Total Revenue by Region
Endpoint: GET /revenue/by-region

Query Parameters:

startDate: Start date for calculation.

endDate: End date for calculation.

region: Name of the region to filter by.

5. Revenue Trends Over Time
Endpoint: GET /revenue/trends

Query Parameters:

startDate: Start date for trend analysis.

endDate: End date for trend analysis.

Postman Collection
To facilitate testing of the API, a Postman collection with pre-configured requests for all endpoints is included.

How to Use the Collection:
Download the attached Postman collection file (Sales_Data_API.postman_collection.json).

Open Postman and import the collection:

Go to File > Import, select the JSON file, and click "Import."

Update base URLs in requests if necessary (e.g., replace {base_path} with your local or deployed URL).

Use Postman to send requests and view responses.
