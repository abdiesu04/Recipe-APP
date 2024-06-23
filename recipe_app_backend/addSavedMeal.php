<?php
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // Handle preflight requests here
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if user is authenticated
    session_start();
    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'User not authenticated.']);
        exit;
    }

    $userId = $_SESSION['user']['id'];
    $mealId = $data['mealId'];

    // Check if meal is already saved
    $stmt = $pdo->prepare("SELECT * FROM saved_meals WHERE user_id = ? AND meal_id = ?");
    $stmt->execute([$userId, $mealId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['status' => 'error', 'message' => 'Meal is already saved.']);
        exit;
    }

    // Save meal
    $sql = "INSERT INTO saved_meals (user_id, meal_id) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$userId, $mealId])) {
        echo json_encode(['status' => 'success', 'message' => 'Meal saved successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save meal.']);
    }
}
?>
