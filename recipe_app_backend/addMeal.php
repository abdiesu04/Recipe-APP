<?php
// addMeal.php

// Database connection
require_once 'db.php'; // Include your database connection script

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Example validation - Ensure required fields are present
$requiredFields = ['idMeal', 'strMeal', 'strCategory', 'strArea', 'strTags', 'ingredients', 'strInstructions'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field])) {
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
}

// Process form data
$idMeal = $_POST['idMeal'];
$strMeal = $_POST['strMeal'];
$strCategory = $_POST['strCategory'];
$strArea = $_POST['strArea'];
$strTags = $_POST['strTags'];
$ingredients = json_decode($_POST['ingredients'], true); // Convert JSON to PHP array
$strInstructions = $_POST['strInstructions'];

try {
    // Insert new meal into database
    $stmt = $pdo->prepare('INSERT INTO saved_meals (userId, idMeal, strMeal, strCategory, strArea, strTags, ingredients, strInstructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$userId, $idMeal, $strMeal, $strCategory, $strArea, $strTags, json_encode($ingredients), $strInstructions]);

    echo json_encode(['status' => 'success', 'message' => 'Meal added successfully']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to add meal: ' . $e->getMessage()]);
}
?>
