# 1x1 Scheduler

**1x1 Scheduler** is a web application for scheduling 1-on-1 mentoring sessions. It allows students to book appointments with mentors based on their areas of expertise and availability.

## Features

- **Student Registration**: Students can register with their names, email addresses, and areas of interest.
- **Mentor Registration**: Mentors can register with their names, email addresses, and areas of expertise.
- **Mentor Availability**: Mentors can set their availability for 1-on-1 sessions.
- **Booking Management**: Students can book sessions with mentors, either selecting a preferred mentor or letting the system assign one based on their area of interest.
- **Payment Handling**: The system processes payments for booked sessions, with an additional charge for preferred mentors.
- **Status Tracking**: Bookings are tracked with status updates including pending, confirmed, and canceled.

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/sanjaydbg735/1x1-Scheduler.git
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` File**:

    Copy the example environment file and configure your environment variables:

    ```bash
    cp .env.example .env
    ```

    Edit the `.env` file to include your configuration settings:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=password
    SECRET_KEY=mysecretkey
    ```

4. **Run Database Migrations**:

    Ensure your database is set up and run the migrations to create the required tables.

    ```bash
    npm run migrate
    ```

5. **Start the Application**:

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## API Endpoints

- **POST /students**: Register a new student.
- **POST /mentors**: Register a new mentor.
- **POST /availability**: Set or update mentor availability.
- **POST /bookings**: Book a mentoring session.
- **GET /bookings/:id**: Get booking details.
- **POST /payments**: Process payment for a booking.

## Development

To contribute to the project:

1. **Fork the Repository**.
2. **Create a Feature Branch**:

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Commit Your Changes**:

    ```bash
    git commit -am 'Add new feature'
    ```

4. **Push to the Branch**:

    ```bash
    git push origin feature/your-feature
    ```

5. **Create a Pull Request**.

## Testing

Run the tests to ensure everything is working:

```bash
npm test
