# GPU Auction 

Welcome to the SF Compute Exchange! This project is a simple auction house system for GPU clusters, allowing customers to view available compute and place bids on them. 

## Key Features

- Browse and search available GPU clusters with details.
- Place bids on specific GPU compute for desired hourly slots. 
- Intuitive and user-friendly interface! 

## Components

- **GPU Cluster Card**: Displays the details of a GPU cluster, including the number of GPUs, memory, and hourly rate. 
- **Bid Form**: Allows users to place bids on a specific GPU cluster for desired hourly slots. 
- **Search Bar**: Enables users to search for GPU clusters by name or location. 


## Under the Hood

- **Auction System Logic** 
- **Database Schema**
- **API Endpoints**

## Technologies Used

- TypeScript 
- Next.js 
- React/React Bootstrap
- PostgreSQL

## Roadmap 

While the core functionality of the auction house system is in place, there are still many features and improvements that can be made. 

### Ideas for the future 
- Bid History 
- User Dashboard 
- Bid Cancellation
- Handling partial bids 
- Real-time Updates 
- Optimize the db queries  
- User Auth 
- Comprehensive Testing 


## Getting Started  

To use this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/jungyoonlim/gpu-auction.git
   ```

2. Navigate to the project directory:
   ```
   cd gpu-auction
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```
     DB_USER=your_database_username
     DB_HOST=your_database_host
     DB_NAME=your_database_name
     DB_PASSWORD=your_database_password
     DB_PORT=your_database_port
     ```
   - Replace the placeholders with your actual database credentials.

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and visit `http://localhost:3000` to see the application running.

Note: Make sure you have Node.js and PostgreSQL installed on your machine before running the project.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcomed.


## License
This project is licensed under the MIT License - see the LICENSE file for details. 

