CREATE DATABASE schedulerDB;
use schedulerDB;
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    area_of_interest VARCHAR(255)
);

CREATE TABLE mentors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    area_of_expertise VARCHAR(255)
);

CREATE TABLE mentor_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mentor_id INT,
    available_from DATETIME,
    available_to DATETIME,
    FOREIGN KEY (mentor_id) REFERENCES mentors(id)
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    mentor_id INT,
    booking_start DATETIME,
    booking_end DATETIME,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (mentor_id) REFERENCES mentors(id)
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    student_id INT,
    mentor_id INT,
    amount DECIMAL(10, 2),
    status ENUM('success', 'failed'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (mentor_id) REFERENCES mentors(id)
);
