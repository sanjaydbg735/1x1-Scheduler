-- Students
INSERT INTO students (name, email, area_of_interest) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'Data Science'),
('Bob Smith', 'bob.smith@example.com', 'Machine Learning'),
('Carol White', 'carol.white@example.com', 'Web Development'),
('David Green', 'david.green@example.com', 'Cybersecurity');

-- Mentors
INSERT INTO mentors (name, email, area_of_expertise) VALUES
('Dr. Emily Brown', 'emily.brown@example.com', 'Data Science'),
('John Doe', 'john.doe@example.com', 'Machine Learning'),
('Sara Lee', 'sara.lee@example.com', 'Web Development'),
('Michael Clark', 'michael.clark@example.com', 'Cybersecurity');

-- Mentor Availability
INSERT INTO mentor_availability (mentor_id, available_from, available_to) VALUES
(1, '2024-08-15 09:00:00', '2024-08-15 17:00:00'),
(2, '2024-08-16 10:00:00', '2024-08-16 18:00:00'), 
(3, '2024-08-15 08:00:00', '2024-08-15 16:00:00'),
(4, '2024-08-17 09:00:00', '2024-08-17 17:00:00'); 

-- Bookings
INSERT INTO bookings (student_id, mentor_id, booking_start, booking_end, status) VALUES
(1, 1, '2024-08-15 10:00:00', '2024-08-15 11:00:00', 'confirmed'), 
(2, 2, '2024-08-16 11:00:00', '2024-08-16 12:00:00', 'pending'), 
(3, 3, '2024-08-15 13:00:00', '2024-08-15 14:00:00', 'confirmed'),
(4, 4, '2024-08-17 10:00:00', '2024-08-17 11:00:00', 'cancelled');

-- Payments
INSERT INTO payments (booking_id, student_id, mentor_id, amount, status, created_at) VALUES
(1, 1, 1, 2100.00, 'success', '2024-08-15 09:45:00'),
(2, 2, 2, 2100.00, 'failed', '2024-08-16 10:45:00'),
(3, 3, 3, 2100.00, 'success', '2024-08-15 12:00:00'),
(4, 4, 4, 2100.00, 'success', '2024-08-17 09:00:00');
