<?php
// getSavedMeals.php

// Database connection
require_once 'db.php'; // Include your database connection script

header('Content-Type: application/json');

// Check if userId is provided in the query string
if (!isset($_GET['userId'])) {
    echo json_encode(['error' => 'User ID not provided']);
    exit;
}

$userId = $_GET['userId'];

// Query to fetch saved meals for the user
try {
    $stmt = $pdo->prepare('SELECT * FROM saved_meals WHERE userId = ?');
    $stmt->execute([$userId]);
    $savedMeals = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($savedMeals);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch saved meals: ' . $e->getMessage()]);
}
?>
